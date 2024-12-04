import React from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Settings_page() {
  
  const handleSubmit = async (e) => {
    e.preventDefault();

  }

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
            { to: "/gadgets", label: "Gadgets", icon: <FaFantasyFlightGames /> },
            { to: "/orders", label: "Order", icon: <FaCartShopping />, },
            { to: "/customer", label: "Customer", icon: <FaUsers /> },
            { to: "/products", label: "Products", icon: <AiOutlineProduct /> },
            { to: "/payments", label: "Payment", icon: <AiFillBank /> },
            { to: "/settings", label: "Settings", icon: <AiFillSetting />, active: true},
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
        <div className="px-4 py-2">

          <div className="flex justify-between items-center">
            <h1 className='text-xl font-medium'>Settings</h1>
            <div className="">
              {/* <button className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[130px] py-2 rounded-sm font-medium'><IoMdAddCircleOutline className='text-xl'/>Add News</button> */}
            </div>
          </div>

          <div className="mx-auto lg:max-w-[50%] max-w-[100%] p-3 rounded-md bg-white mt-10">
            <form onSubmit={handleSubmit}>
              <div className="mx-auto w-[100px] h-[100px] rounded-full mb-8">
                <input type="file" name="" id="" className='hidden'/>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" alt="" className='max-w-[100%] max-h-[100%]'/>
              </div>
              <div className="">
                <p className="font-medium pb-2 text-blue-950">Username:</p>
                <input type="text" id='username' placeholder='Username' className="placeholder:text-sm placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
              </div>
              <div className="my-5">
                <p className="font-medium pb-2 text-blue-950">Email:</p>
                <input type="email" id='email' placeholder='Example@gmail.com' className="placeholder:text-sm placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
              </div>
              <div className="">
                <p className="font-medium pb-2 text-blue-950">Password:</p>
                <input type="password" id='password' placeholder='***********' className="placeholder:text-sm placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md"/>
              </div>

              <div className="mt-5">
                <button className="font-medium bg-blue-950 text-white px-4 sm:py-2 py-3 rounded-md">Save Changes</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
