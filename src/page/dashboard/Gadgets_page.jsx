import React, { useRef, useState } from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaTrash, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'
import { FiDelete } from 'react-icons/fi'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Gadgets_page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const fileRef = useRef(null);

  const [files, setFile] = useState([]);
  
  const [ formData, setFormData ] = useState({
    name: '',
    category: '',
    price: '',
    date: '',
    image:[],
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
            image: [...prevFormData.image, uploadedUrl],
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
  
    const url = `https://fake-api-one-rust.vercel.app/api/gadget/create_product`;
  
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
            { to: "/news", label: "News", icon: <FaRegNewspaper /> },
            { to: "/betslips", label: "Betslips", icon: <FaVolleyball /> },
            { to: "/gadgets", label: "Gadgets", icon: <FaFantasyFlightGames />, active: true },
            { to: "/orders", label: "Order", icon: <FaCartShopping />, },
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
        <div className="absolute bottom-2 w-full">
          <button className="py-2 px-2 text-start rounded-md text-white font-medium w-[94%] flex items-center justify-start gap-2"><BiLogOut /> Log Out</button>
        </div>
      </div>
      <div className="flex-1 h-[100vh] overflow-y-scroll overflow-x-hidden">
        <Header/>
        <div className="px-4 mt-6">

          <form onSubmit={handleSubmit} className=''>
            <div className="flex justify-between items-center">
              <h1 className='text-xl font-medium'>Gadgets</h1>
              <div className="">
                <button type='submit' className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[130px] py-2 rounded-md font-medium'>
                {
                  loading ? 'Loading' : (
                    <>
                      <IoMdAddCircleOutline className='text-xl'/>Add Gadget
                    </>
                  )
                }
                </button>
              </div>
            </div>

            <div className="mx-auto lg:max-w-[95%] max-w-[100%] lg:p-3 rounded-md mt-5">

                <div className="w-full flex flex-wrap justify-around gap-5">
                  {/* input required fields */}
                  <div className="flex-1 bg-white px-2 py-3 rounded-md">
                    <div className="mb-5">
                      <p className="font-medium pb-2 text-blue-950">Name:</p>
                      <input required type="text" onChange={handleChange} id='name' placeholder='Product name' className="placeholder:text-sm font-medium placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                    </div>
                    <div className="">
                      <p className="font-medium pb-2 text-blue-950">Category:</p>
                      <select onChange={handleChange} id='category' className='font-medium border border-gray-300 outline-none w-full sm:py-3 py-3 pl-3 rounded-md'>
                        <option value="PS2">PS2 Pad</option>
                        <option value="PS2">PS3 Pad</option>
                        <option value="PS2">PS4 Pad</option>
                        <option value="PS2">PS4 Pad</option>
                        <option value="PS2">PS5 Pad</option>
                        <option value="PS2">PS2 Games</option>
                        <option value="PS2">PS3 Games</option>
                        <option value="PS2">PS4 Games</option>
                        <option value="PS2">PS4 Games</option>
                        <option value="PS2">PS5 Games</option>
                      </select>
                    </div>
                    <div className="my-5">
                      <p className="font-medium pb-2 text-blue-950">Date:</p>
                      <input required type="date" onChange={handleChange} id='date' placeholder='Example@gmail.com' className="placeholder:text-sm font-medium placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                    </div>
                    <div className="my-5">
                      <p className="font-medium pb-2 text-blue-950">Price:</p>
                      <input required type="Number" onChange={handleChange} id='price' placeholder='Enter price' className="placeholder:text-sm font-medium placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                    </div>
                    <div className="">
                      <p className="font-medium pb-2 text-blue-950">Description:</p>
                      <textarea required type="text" onChange={handleChange} id='description' placeholder='Description' className="placeholder:text-sm font-medium placeholder:text-gray-300 h-[150px] border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                    </div>
                  </div>

                  <div className={`w-[350px] ${formData.image.length > 0 ? 'h-full' : 'h-[250px]'} rounded-md bg-white p-2 md:mb-0 mb-4`}>
                    <div className="w-[100%] border  relative flex justify-center items-center">
                      <img src={`${formData.image.length > 0 && formData.image[0]}`} alt="" className={`${formData.image.length > 0 ? 'bg-white' : ''} rounded-md maxw-[100%] h-[230px] max-h-[100%]`}/>
                      <button onClick={handleUpload} type='button' className='absolute '>
                        <img src="/upload.png" alt="" className='max-w-[5rem]'/>
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {
                        formData.image.length > 0 && (
                          formData.image.map((url, index) => {
                            const handleDelete = () => {
                              setFormData({
                                ...formData,
                                image: formData.image.filter((_, i) => i !== index)
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

        </div>
      </div>
    </div>
  )
}
