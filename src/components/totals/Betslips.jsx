import React, { useContext } from 'react'
import { betslipContext } from '../../page/dashboard/Dashboard'

export default function Betslips() {
  const bet = useContext(betslipContext);

  return (
    <div>
      <h2 className="font-medium text-xl">Betslips Code</h2>
      <div className="flex justify-center items-center pt-7">
        <p className="text-4xl text-blue-900">{bet.length}</p>
      </div>
      <div className="mt-7">
        <p className="text-[12px] text-zinc-400"> Total Betslips</p>
      </div>
    </div>
  )
}
