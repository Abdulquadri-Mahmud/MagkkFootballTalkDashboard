import React, { useEffect, useRef, useState } from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaTrash, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProducts() {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ success, setSuccess ] = useState(false);
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

  useEffect(() => {
    const fetchProduct = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/gadget/single_products/${id}`;

        const res = await fetch(url);

        const data = await res.json();

        if (data.success === false) {
          setError('Error while fetching data!');
        }

        setFormData(data);
      }; fetchProduct();
  }, []);

  console.log(formData);  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = `https://fake-api-one-rust.vercel.app/api/gadget/update_products/${id}`;
  
    try {
      setLoading(true);
  
      const res = await fetch(url, {
        method: 'PATCH',
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
          <button className="py-2 px-2 w-full text-start rounded-sm font-medium text-white hover:bg-white hover:text-black duration-150">
            <Link to={'/'} className='flex items-center gap-1'>
              <LuLayoutGrid className=''/>Dashboard
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white hover:bg-white hover:text-black duration-150 font-medium">
            <Link to={'/news'} className='flex items-center gap-2'>
              <FaRegNewspaper /> News
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white hover:bg-white hover:text-black duration-150 font-medium">
            <Link to={'/betslips'} className='flex items-center gap-2'>
              <FaVolleyball />Betslips
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white font-medium">
            <Link to={'/gadgets'} className='flex items-center gap-2'>
              <FaFantasyFlightGames />Gadgets
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white hover:bg-white hover:text-black duration-150 font-medium">
            <Link to={'/orders'} className='flex items-center gap-2'>
              <FaCartShopping />Order
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white hover:bg-white hover:text-black duration-150 font-medium">
            <Link to={'/customer'} className='flex items-center gap-2'>
              <FaUsers />Customer
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white hover:bg-white hover:text-black duration-150 font-medium">
            <Link to={'/products'} className='flex items-center gap-2'>
              <AiOutlineProduct />Products
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white hover:bg-white hover:text-black duration-150 font-medium">
            <Link to={'/payments'} className='flex items-center gap-2'>
              <AiFillBank />Payment
            </Link>
          </button>
          <button className="py-2 px-2 w-full text-start rounded-sm text-white hover:bg-white hover:text-black duration-150 font-medium">
            <Link to={'/settings'} className='flex items-center gap-2'>
              <AiFillSetting />Settings
            </Link>
          </button>
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
                <button type='submit' className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[160px] py-2 rounded-md font-medium'>
                {
                  loading ? 'Loading' : (
                    <>
                      <IoMdAddCircleOutline className='text-xl'/>Update Gadget
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
                      <input defaultValue={formData.name} required type="text" onChange={handleChange} id='name' placeholder='Product name' className="placeholder:text-sm font-medium placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                    </div>
                    <div className="">
                      <p className="font-medium pb-2 text-blue-950">Category:</p>
                      <select defaultValue={formData.category} onChange={handleChange} id='category' className='font-medium border border-gray-300 outline-none w-full sm:py-3 py-3 pl-3 rounded-md'>
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
                      <input defaultValue={formData.date} required type="date" onChange={handleChange} id='date' placeholder='Example@gmail.com' className="placeholder:text-sm font-medium placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                    </div>
                    <div className="my-5">
                      <p className="font-medium pb-2 text-blue-950">Price:</p>
                      <input defaultValue={formData.price} required type="Number" onChange={handleChange} id='price' placeholder='Enter price' className="placeholder:text-sm font-medium placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
                    </div>
                    <div className="">
                      <p className="font-medium pb-2 text-blue-950">Description:</p>
                      <textarea defaultValue={formData.description} required type="text" onChange={handleChange} id='description' placeholder='Description' className="placeholder:text-sm font-medium placeholder:text-gray-300 h-[150px] border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
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
