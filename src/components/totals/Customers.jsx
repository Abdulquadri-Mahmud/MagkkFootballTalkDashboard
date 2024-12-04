import React, { useContext } from 'react'
import { userContext } from '../../page/dashboard/Dashboard'

export default function Customers() {
  const user = useContext(userContext);

  return (
    <div>
      <h2 className="font-medium text-xl">Customers</h2>
      <div className="flex justify-center items-center pt-7">
        <p className="text-4xl text-blue-900">{user.length}</p>
      </div>
      <div className="mt-7">
        <p className="text-[12px] text-zinc-400">Total Customers</p>
      </div>
      
    </div>
  )
}
