import React, { createContext, Suspense, useEffect, useState } from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'
import News from '../../components/totals/News'
import Betslips from '../../components/totals/Betslips'
import Gadgets from '../../components/totals/Gadgets'
import Customers from '../../components/totals/Customers'
import Products from '../../components/totals/Products'
import { Link } from 'react-router-dom'

export const UserlistContext = createContext();
export const userContext = createContext();
export const betslipContext = createContext();
export const newsContext = createContext();
export const gadgetContext = createContext();

const User_lists = React.lazy(() => import('../../components/User_lists'))

export default function Dashboard() {
  const [ error, setError] = useState(null);
  const [ user, setUser ] = useState({});
  const [ betslip, setBetslip ] = useState({});
  const [ news, setNews ] = useState({});
  const [ gadget, setGadget ] = useState({});
  
  useEffect(() => {
    try {

      const fetchUsers = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/user/auth/all-user`;

        const res = await fetch(url);

        const data = await res.json();

        if (data.success === false) {
          setError('Error while fetching data!');
        }

        setUser(data);
      }; fetchUsers();

      const fetchBetslip = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/betslip/all_betslip`;

        const res = await fetch(url);

        const data = await res.json();

        if (data.success === false) {
          setError('Error while fetching data!');
        }

        setBetslip(data);
      }; fetchBetslip();

      const fetchNews = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/news/all_news`;

        const res = await fetch(url);

        const data = await res.json();

        if (data.success === false) {
          setError('Error while fetching data!');
        }

        setNews(data);
      }; fetchNews();

      const fetchGadget = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/gadget/all_products`;

        const res = await fetch(url);

        const data = await res.json();

        if (data.success === false) {
          setError('Error while fetching data!');
        }

        setGadget(data);
      }; fetchGadget();


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
            { to: "/dashboard", label: "Dashboard", icon: <LuLayoutGrid />, active: true },
            { to: "/news", label: "News", icon: <FaRegNewspaper /> },
            { to: "/betslips", label: "Betslips", icon: <FaVolleyball /> },
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
        <div className="absolute bottom-2 w-full">
          <button className="py-2 px-2 text-start rounded-md text-white font-medium w-[94%] flex items-center justify-start gap-2"><BiLogOut /> Log Out</button>
        </div>
      </div>
      <div className="flex-1 h-[100vh] overflow-y-scroll overflow-x-hidden">
        <Header/>
        <div className="px-4 py-2">

          <div className="flex justify-between items-center">
            <h1 className='text-xl font-medium'>Dashboard</h1>
            <div className="">
              <button className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[] px-2 py-2 rounded-sm font-medium'><IoMdAddCircleOutline className='text-xl'/>Add new order</button>
            </div>
          </div>

          <div className="pt-6 flex justify-start gap-5 items-center md:flex-nowrap flex-wrap">

            <div className="p-4 rounded-sm bg-white font-medium md:w-[25%] w-[47%] h-[170px]">
              <newsContext.Provider value={news}>
                <News news={news}/>
              </newsContext.Provider>
            </div>

            <div className="p-3 rounded-sm bg-white font-medium md:w-[25%] w-[47%] h-[170px]">
              <betslipContext.Provider value={betslip}>
                <Betslips betslip={betslip}/>
              </betslipContext.Provider>
            </div>

            <div className="p-3 rounded-sm bg-white font-medium md:w-[25%] w-[47%] h-[170px]">
              <gadgetContext.Provider value={gadget}>
                <Gadgets gadget={gadget}/>
              </gadgetContext.Provider>
            </div>

            <div className="p-3 rounded-sm bg-white font-medium md:w-[25%] w-[47%] h-[170px]">
              <userContext.Provider value={user}>
                <Customers user={user}/>
              </userContext.Provider>
            </div>
          </div>

          <div className="flex mt-10 items-center justify-between">
            <h2 className="text-2xl font-medium">Customers</h2>
            <Link to={'view-all-customers'} className='text-sm text-gray-400'>View all</Link>
          </div>

          <div className="w-full mt-4 overflow-x-scroll tables bg-white rounded-md">
            <table class="w-full border border-gray-300 rounded-b-md">
              <thead>
                <tr>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white rounded-tl-md font-medium">Firstname</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Lastname</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Username</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Phone</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white font-medium">Email</th>
                  <th class="px-2 lg:py-3 py-2 text-start bg-blue-950 text-white rounded-tr-md font-medium">Address</th>
                </tr>
              </thead>
              <tbody>
                <Suspense fallback={'Loading...'}>
                  <UserlistContext.Provider value={user}>
                    <User_lists user={user}/>
                  </UserlistContext.Provider>
                </Suspense>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}