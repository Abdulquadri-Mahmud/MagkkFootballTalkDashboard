import React, { useContext } from 'react'
import { gadgetContext } from '../../page/dashboard/Dashboard'

export default function Gadgets() {
  const data = useContext(gadgetContext);

  return (
    <div>
      <h2 className="font-medium text-xl">Gadgets</h2>
      <div className="flex justify-center items-center pt-7">
        <p className="text-4xl text-blue-900">{data.length > 0 ? data.length : 0}</p>
      </div>
      <div className="mt-7">
        <p className="text-[12px] text-zinc-400">Total Gadgets</p>
      </div>
    </div>
  )
}
