import React, { createContext, Suspense, useEffect, useState, useContext } from "react";
import { GiSoccerKick } from "react-icons/gi";
import Header from "../../components/Header";
import { BiLogOut } from "react-icons/bi";
import {
  FaCartShopping,
  FaFantasyFlightGames,
  FaRegNewspaper,
  FaUsers,
  FaVolleyball,
} from "react-icons/fa6";
import { LuLayoutGrid } from "react-icons/lu";
import { AiFillBank, AiFillSetting, AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
import Order_lists from "../../components/totals/Order_lists";

export const OrderContext = createContext();

export default function Order_page() {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`https://fake-api-one-rust.vercel.app/api/order/all_orders`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex h-[100vh] bg-zinc-200">
      {/* Sidebar */}
      <div className="w-[250px] px-2 py-3 bg-blue-950 h-full">
        <div className="rounded-md w-full flex justify-center py-2">
          <h1 className="text-white text-center font-bold lg:text-xl text-xl flex items-center">
            MagkkFootballTalk <GiSoccerKick className="text-2xl" />
          </h1>
        </div>
        <div className="flex flex-col justify-start items-start gap-3 mt-10">
          {/* Sidebar Links */}
          {[
            { to: "/dashboard", label: "Dashboard", icon: <LuLayoutGrid /> },
            { to: "/news", label: "News", icon: <FaRegNewspaper /> },
            { to: "/betslips", label: "Betslips", icon: <FaVolleyball /> },
            { to: "/gadgets", label: "Gadgets", icon: <FaFantasyFlightGames /> },
            { to: "/orders", label: "Order", icon: <FaCartShopping />, active: true },
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
          <button className="py-2 px-2 text-start rounded-md text-white font-medium w-[94%] flex items-center justify-start gap-2">
            <BiLogOut /> Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-[100vh] overflow-y-scroll">
        <Header />
        <div className="px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Orders</h1>
          </div>
          <div className="w-full mt-10 overflow-x-scroll">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <OrderContext.Provider value={orders}>
                <Suspense fallback={<p>Loading orders...</p>}>
                  <Order_lists />
                </Suspense>
              </OrderContext.Provider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
