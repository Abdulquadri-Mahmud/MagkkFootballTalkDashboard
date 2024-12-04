import React from 'react'
import { Link } from 'react-router-dom'
import Settings from './Settings'

export default function Header() {
  return (
    <div className='bg-white py-4 px-4 flex justify-between items-center'>
        <div className="">
            <Link to={'/admin-dashboard'} className='text-sm text-gray-500'>/Dashboard</Link>
        </div>
        <div className="">
            <Settings/>
        </div>
    </div>
  )
}
