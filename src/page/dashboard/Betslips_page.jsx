import React, { useRef, useState } from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'

import { Link } from 'react-router-dom'

export default function Betslips_page() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const [ formData, setFormData ] = useState({
    betslipCode: '',
    category: 'Bet9ja',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'https://fake-api-one-rust.vercel.app/api/betslip/create_betslip';

    try {
      setLoading(true);

      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }

      setSuccess(true);
      setLoading(false);
      setError(false);

    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
      
    }
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
            { to: "/betslips", label: "Betslips", icon: <FaVolleyball />, active: true},
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
            <h1 className='text-xl font-medium'>Betslips</h1>
            <div className="">
              <button type='submit' className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[130px] py-2 rounded-sm font-medium'>
                {
                  loading ? 'Loading' : (
                    <>
                      <IoMdAddCircleOutline className='text-xl'/>Add Betslip
                    </>
                  )
                }
              </button>
            </div>
          </div>

          <div className="mx-auto lg:max-w-[65%] max-w-[100%] lg:p-3 rounded-md mt-5">

              <div className="w-full flex flex-wrap justify-around gap-5">
                {/* input fields */}
                <div className="flex-1 bg-white px-2 py-3 rounded-md">
                  <div className="">
                    <p className="font-medium pb-2 text-blue-950">Betslip:</p>
                    <input type="text" onChange={handleChange} id='betslipCode' placeholder='Betslip' className="placeholder:text-sm font-medium placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md" required/>
                  </div>
                  <div className="mt-5">
                    <p className="font-medium pb-2 text-blue-950">Category:</p>
                    <select onChange={handleChange} id='category' className='font-medium border border-gray-300 outline-none w-full sm:py-3 py-3 pl-3 rounded-md' required>
                      <option value="Bet9ja">Bet9ja</option>
                      <option value="SportyBet">SportyBet</option>
                      <option value="BetKing">BetKing</option>
                      <option value="1xBet">1xBet</option>
                      <option value="Betano">Betano</option>
                      <option value="MSport">MSport</option>
                      <option value="PariMatch">PariMatch</option>
                      <option value="22Bet">22Bet</option>
                    </select>
                  </div>
                  <div className="my-5">
                    <p className="font-medium pb-2 text-blue-950">Date:</p>
                    <input type="date" onChange={handleChange} id='date' placeholder='Example@gmail.com' className="placeholder:text-sm placeholder:text-gray-300 border border-gray-300 outline-none w-full sm:py-2 py-3 pl-3 rounded-md font-medium" required/>
                  </div>
                  
                </div>

              </div>
          </div>
          {
            error && (
              <div className='mt-4 w-full text-red-600 py-2 border-red-500 rounded-md border flex justify-center items-center'>
                {error}
              </div>
            )
          }
          {/* {
            success && (
              <>
                {
                  setTimeout(() => {
                    <div className='mt-4 w-full text-green-600 border-green-500 py-2 rounded-md border flex justify-center items-center'>
                      Betslip created successfully!
                    </div>
                  }, 1000)
                }
              </>
            )
          } */}
        </form>

        </div>
      </div>
    </div>
  )
}
