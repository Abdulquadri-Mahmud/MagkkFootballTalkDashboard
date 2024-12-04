import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaCartShopping, FaFantasyFlightGames, FaUser, FaVolleyball } from 'react-icons/fa6';
import { IoBagHandleSharp, IoHandLeftOutline } from 'react-icons/io5';
import { TbLogout2 } from 'react-icons/tb';
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Settings() {
  return (
    <div>
        <div className="relative parent">
          <div className="flex gap-2 items-center">
            <CgProfile className='text-3xl text-blue-900'/>
            {/* <div className="w-[100px] hidden lg:block">
              <p className="text-sm font-medium">UserID</p>
              <p className="text-sm text-gray-400 truncate">magkkfootballtalk@gmail.com</p>
            </div> */}
          </div>
            <div className="shadow-md duration-150 child flex flex-col gap-3 absolute right-0 overflow-hidden w-[200px] h-[0px] bg-white text-black z-30 rounded-md font-medium">
                <p className="text-blue-900 flex items-center gap-1 text-center mb-4">Hi <IoHandLeftOutline /></p>
                <Link to={'/settings'} className='flex items-center gap-2 hover:text-blue-900 duration-200'><FaUser className='text-blue-900' />My Profile</Link>
                <Link to={'/gadgets'} className='flex items-center gap-2 hover:text-blue-900 duration-200'><FaFantasyFlightGames className='text-blue-900' />New Gadget</Link>
                <Link to={'/betslips'} className=' flex items-center gap-2 hover:text-blue-900 duration-200'><FaVolleyball className='text-blue-900' />New Betslip</Link>
                <button className='text- w-full text-start flex items-center gap-2 hover:text-blue-900 duration-200'><TbLogout2 className='text-blue-900'/>Log Out</button>
            </div>
        </div>
    </div>
  )
}
