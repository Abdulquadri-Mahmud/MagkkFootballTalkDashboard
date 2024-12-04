import React, { useContext } from 'react'
import { newsContext } from '../../page/dashboard/Dashboard'

export default function News() {
  const news = useContext(newsContext);
  
  return (
    <div>
      <h2 className="font-medium text-xl">News</h2>
      <div className="flex justify-center items-center pt-7">
        <p className="text-4xl text-blue-900">{news.length}</p>
      </div>
      <div className="mt-7">
        <p className="text-[12px] text-zinc-400">Total News</p>
      </div>
    </div>
  )
}
