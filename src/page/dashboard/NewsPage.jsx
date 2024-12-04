import React, { createContext, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaTrash, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'

import { Link } from 'react-router-dom';

export const newsListContext = createContext();
const NewsList = React.lazy(() => import('../../components/NewsList'))

export default function NewsPage() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [ formData, setFormData ] = useState({
    source:[],
    title: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  }

  const handleUpload = async (e) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dypn7gna0",
        uploadPreset: "magkk_football_talk",
        sources: ["local", "url", "camera"],
        multiple: true, // Allow multiple uploads
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedUrl = result.info.secure_url; // Get the secure URL for the uploaded file
  
          // Update the formData.image array incrementally
          setFormData((prevFormData) => ({
            ...prevFormData,
            source: [...prevFormData.source, uploadedUrl],
          }));
  
          // alert(`Image uploaded successfully! URL: ${uploadedUrl}`);
        } else if (error) {
          console.error("Upload Error:", error);
          alert("An error occurred during upload.");
        }
      }
    );
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://fake-api-one-rust.vercel.app/api/news/create_news`;
  
    try {
      setLoading(true);
  
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!data.success) {
        // Handle error if response indicates failure
        setError(data.message || 'Something went wrong');
        return; // Exit the function early
      }
  
      // If successful
      setSuccess(true);
      setError(false);

      toast.success('Gadget created successfully!');
      
    } catch (error) {
      // Handle network or other unexpected errors
      setError(error.message || 'An unexpected error occurred');
      toast.error(`Error: ${data.message || 'Failed to create gadget'}`);
    } finally {
      // Ensure loading state is reset
      setLoading(false);
    }
  };

  const [news, setNews] = useState([]);

  useEffect(() => {
    try {
      const fetchNews = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/news/all_news`;
    
        const res = await fetch(url);
    
        const data = await res.json();
    
        if (data.success === false) {
          setError('Error while fetching data!');
        }
    
        setNews(data);
      }; fetchNews();
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <div className='flex h-[100vh] bg-zinc-200'>
      <div className="w-[250px] relative px-2 py-3 bg-blue-950 h-full">
        <div className="rounded-md w-full flex justify-center py-2">
          <h1 className='text-white text-center font-bold lg:text-xl text-xl flex items-center'>MagkkFootballTalk <GiSoccerKick className='text-2xl'/></h1>
        </div>
        <div className="flex flex-col justify-start items-start gap-3 mt-10">
          {/* Sidebar Links */}
          {[
            { to: "/dashboard", label: "Dashboard", icon: <LuLayoutGrid /> },
            { to: "/news", label: "News", icon: <FaRegNewspaper />, active : true},
            { to: "/betslips", label: "Betslips", icon: <FaVolleyball /> },
            { to: "/gadgets", label: "Gadgets", icon: <FaFantasyFlightGames /> },
            { to: "/orders", label: "Order", icon: <FaCartShopping />,},
            { to: "/customer", label: "Customer", icon: <FaUsers /> },
            { to: "/products", label: "Products", icon: <AiOutlineProduct /> },
            { to: "/payments", label: "Payment", icon: <AiFillBank /> },
            { to: "/settings", label: "Settings", icon: <AiFillSetting /> },
          ].map(({ to, label, icon, active }) => (
            <button
              key={to}
              className={`py-2 px-2 w-full text-start rounded-sm ${
                active ? "text-black bg-white" : "text-white hover:bg-white hover:text-black"
              } duration-150 font-medium`}
            >
              <Link to={to} className="flex items-center gap-2">
                {icon} {label}
              </Link>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 h-[100vh] overflow-y-scroll overflow-x-hidden">
        <Header/>
        <div className="px-4 py-5">

        <form onSubmit={handleSubmit} className='mt-4'>
          <div className="flex justify-between items-center">
            <h1 className='text-xl font-medium'>News</h1>
            <div className="">
              <button type='submit' className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[130px] py-2 rounded-sm font-medium'>
                {
                  loading ? 'Loading' : (
                    <>
                      <IoMdAddCircleOutline className='text-xl'/>Add News
                    </>
                  )
                }
              </button>
            </div>
          </div>

          <div className="mx-auto lg:max-w-[95%] max-w-[100%] lg:p-3 rounded-md mt-5">

              <div className="w-full flex flex-wrap justify-around gap-5">
                {/* input fields */}
                <div className="flex-1 bg-white px-2 py-3 rounded-md">
                  <div className="">
                    <p className="font-medium pb-2 text-blue-950">Title:</p>
                    <input type="text" onChange={handleChange} id='title' placeholder='Username' className="placeholder:text-sm placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                  </div>
                  <div className="my-5">
                    <p className="font-medium pb-2 text-blue-950">Date:</p>
                    <input type="date" onChange={handleChange} id='date' placeholder='Example@gmail.com' className="placeholder:text-sm placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                  </div>
                  <div className="">
                    <p className="font-medium pb-2 text-blue-950">Description:</p>
                    <textarea type="text" onChange={handleChange} id='description' placeholder='Description' className="placeholder:text-sm placeholder:text-gray-300 h-[150px] border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                  </div>
                </div>

                <div className={`w-[350px] ${formData.source.length > 0 ? 'h-full' : 'h-[250px]'} rounded-md bg-white p-2 md:mb-0 mb-4`}>
                    <div className="w-[100%] border  relative flex justify-center items-center">
                      <img src={`${formData.source.length > 0 && formData.source[0]}`} alt="" className={`${formData.source.length > 0 ? 'bg-white' : ''} rounded-md maxw-[100%] h-[230px] max-h-[100%]`}/>
                      <button onClick={handleUpload} type='button' className='absolute '>
                        <img src="/upload.png" alt="" className='max-w-[5rem]'/>
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {
                        formData.source.length > 0 && (
                          formData.source.map((url, index) => {
                            const handleDelete = () => {
                              setFormData({
                                ...formData,
                                source: formData.source.filter((_, i) => i !== index)
                              })
                            }
                            return (
                              <div key={index} className='w-[70px] h-[70px] flex justify-center items-center rounded-md border'>
                                <img src={url} alt="" className='max-w-[100%] rounded-md'/>
                                <FaTrash onClick={() => handleDelete(index)}/>
                              </div>
                            )
                          })
                        )
                      }
                    </div>
                  </div>
              </div>
          </div>
        </form>
        <div className="w-full bg-white mt-10 overflow-x-scroll tables">
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white rounded-tl-md font-medium">Image</th>
                <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Title</th>
                <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Date</th>
                <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Edit</th>
                <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white rounded-tr-md font-medium">Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                news.length > 0 && news.map((news) => {
                  return (
                    <Suspense fallback={'Loading...'}>
                      <newsListContext.Provider value={news}>
                        <NewsList news={news}/>
                      </newsListContext.Provider>
                    </Suspense>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  )
}
