import React, { createContext, Suspense, useEffect, useState } from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'

import { Link } from 'react-router-dom';

export const CustomerlistContext = createContext();
const Customerlists = React.lazy(() => import('../../components/Customerlists'))

export default function Customer_page() {

  const [ error, setError] = useState(null);
  const [ data, setData ] = useState(false);
  
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/user/auth/all-user`;

        const res = await fetch(url);

        const data = await res.json();

        if (!res.ok) {
          setError('Error while fetching data!');
        }

        setData(data);

      }; fetchUsers();
    } catch (error) {
      setError(error);
    }
  }, []);

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
            { to: "/orders", label: "Order", icon: <FaCartShopping /> },
            { to: "/customer", label: "Customer", icon: <FaUsers />, active : true },
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
        <div className="px-4 pt-5">
          <div className="flex justify-between items-center">
            <h1 className='text-xl font-medium'>News</h1>
            <div className="">
              <button className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[130px] py-2 rounded-sm font-medium'><IoMdAddCircleOutline className='text-xl'/>Add News</button>
            </div>
          </div>

          <div className="w-full mt-10 overflow-x-scroll tables">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white rounded-tl-md font-medium">Firstname</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Lasstname</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Username</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Phone</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Email</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white rounded-tr-md font-medium">Address</th>
                </tr>
              </thead>
              <tbody>
                <Suspense fallback={'Loading...'}>
                  <CustomerlistContext.Provider value={data}>
                    <Customerlists data={data}/>
                  </CustomerlistContext.Provider>
                </Suspense>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
