import React, { createContext, Suspense, useEffect, useState } from 'react'
import { GiSoccerKick } from 'react-icons/gi'
import Header from '../../components/Header'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { FaCartShopping, FaFantasyFlightGames, FaRegNewspaper, FaUsers, FaVolleyball } from 'react-icons/fa6'
import { LuLayoutGrid } from 'react-icons/lu'
import { AiFillBank, AiFillSetting, AiOutlineProduct } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const ProductContext = createContext();
const Product_list = React.lazy(() => import('../../components/Product_list'))

export default function Products_page() {
  const [ error, setError] = useState(null);
  const [ data, setData ] = useState(false);
  
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const url = `https://fake-api-one-rust.vercel.app/api/gadget/all_products`;

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
            { to: "/orders", label: "Order", icon: <FaCartShopping />,},
            { to: "/customer", label: "Customer", icon: <FaUsers /> },
            { to: "/products", label: "Products", icon: <AiOutlineProduct />, active: true },
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
        <div className="px-4 py-2">

          <div className="flex justify-between items-center">
            <h1 className='text-xl font-medium'>Products</h1>
            <div className="">
              {/* <button className='flex justify-center items-center gap-1 bg-blue-950 text-white w-[130px] py-2 rounded-sm font-medium'><IoMdAddCircleOutline className='text-xl'/>Add News</button> */}
            </div>
          </div>

          <div className="w-full bg-white rounded-t-md mt-10 lg:overflow-hidden overflow-x-scroll tables">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="px-2 py-2 text-start bg-blue-950 text-white rounded-tl-md font-medium">Image</th>
                  <th class="px-2 py-2 text-start bg-blue-950 text-white font-medium">Name</th>
                  <th class="px-2 py-2 text-start bg-blue-950 text-white font-medium">Price</th>
                  <th class="px-2 py-2 text-start bg-blue-950 text-white font-medium">Date Added</th>
                  <th class="px-2 py-2 text-start bg-blue-950 text-white font-medium">Description</th>
                  <th class="px-2 py-2 text-start bg-blue-950 text-white font-medium">Edit</th>
                  <th class="px-2 py-2 text-start bg-blue-950 text-white font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.length > 0 && data.map((data) => {
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <ProductContext.Provider value={data}>
                          <Product_list data={data}/>
                        </ProductContext.Provider>
                      </Suspense>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="">

          </div>

        </div>
      </div>
    </div>
  )
}
