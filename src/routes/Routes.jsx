import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../page/dashboard/Dashboard';
import NewsPage from '../page/dashboard/NewsPage';
import Betslips_page from '../page/dashboard/Betslips_page';
import Gadgets_page from '../page/dashboard/Gadgets_page';
import Order_page from '../page/dashboard/Order_page';
import Settings_page from '../page/dashboard/Settings_page';
import Payment_page from '../page/dashboard/Payment_page';
import Products_page from '../page/dashboard/Products_page';
import Customer_page from '../page/dashboard/Customer_page';
import Image from '../page/dashboard/Image';
import UpdateProducts from '../page/dashboard/UpdateProducts';
import Sign_up from '../admin/Sign_up';
import Sign_in from '../admin/Sign_in';
import Forgot_Password from '../admin/Forgot_Password';
import Reset_Password from '../admin/Reset_Password';
import PrivateRoute from '../components/PrivateRoute';
import UpdateNews from '../page/dashboard/UpdateNews';

export default function AppRoutes() {
  return (
    <Router future={{v7_startTransition: true,v7_relativeSplatPath: true,}}>
        <Routes>
            <Route path='/' element={<Sign_in/>}/>
            <Route path='/admin_signup' element={<Sign_up/>}/>
            <Route path='/admin_forgot_password' element={<Forgot_Password/>}/>
            <Route path='/admin_reset_password' element={<Reset_Password/>}/>
            
            <Route element={<PrivateRoute/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/news' element={<NewsPage/>}/>
              <Route path='/update_news/:id' element={<UpdateNews/>}/>
              <Route path='/betslips' element={<Betslips_page/>}/>
              <Route path='/gadgets' element={<Gadgets_page/>}/>
              <Route path='/orders' element={<Order_page/>}/>
              <Route path='/customer' element={<Customer_page/>}/>
              <Route path='/products' element={<Products_page/>}/>
              <Route path='/payments' element={<Payment_page/>}/>
              <Route path='/settings' element={<Settings_page/>}/>
              <Route path='/settings' element={<Settings_page/>}/>
              <Route path='/update_product/:id' element={<UpdateProducts/>}/>
            </Route>
            {/* <Route path='/image' element={<Image/>}/> */}
        </Routes>
    </Router>
  )
}
