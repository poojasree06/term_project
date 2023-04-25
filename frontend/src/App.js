import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './SignIn/login';
import Register from './SignUp/signUp';
import ProductList from './Seller/Product/productList';
import Product from './Seller/Product/Product'
import SellerHome from './Seller/Product/sellerHome';
import Dashboard from './Seller/Dashboard/dashboard'
import ModifyItem from './Seller/Product/modifyProduct'
import CustomerHome from './Customer/Home/Home'
import DisplayItems from './Customer/Item/items'
import MyCart from './Customer/Cart/cartPage'
import Payment from './Customer/Payment/payment';
import OrderTracking from './Customer/Tracking/tracking';
import AdvertiserHome from './Advertiser/Home/Home';
import OrderList from './Customer/Orders/Orderlist';
import CouponForm from './Advertiser/Coupon/CouponForm';
import CouponEdit from './Advertiser/Coupon/CouponEdit';
import ReturnList from './Customer/Returns/ReturnList';
import Return from './Seller/Returns/Return';
import CheckoutForm from './Example/CheckoutForm';
const App = () => {
  return (
            <Router>
            <Routes>
                <>
                  <Route exact path="/" element={<Register />}/>
                  <Route exact path="/Login" element={<Login />}/>
                </>
                <>
                  <Route exact path="/:username/:user_id/SellerHome" element={<SellerHome/>}/>
                  <Route exact path="/:username/:user_id/Items" element={<ProductList/>}/>
                  <Route exact path="/:username/:user_id/createItem" element={<Product/>}/>
                  <Route exact path="/:username/:user_id/Items/:item_id/edit" element={<ModifyItem/>}/>
                  <Route exact path="/:username/:user_id/Dashboard" element={<Dashboard/>}/>
                  <Route exact path="/:username/:user_id/Returned_items" element={<Return/>}/>
                </>
                <>
                  <Route exact path="/:username/:user_id/CustomerHome" element={<CustomerHome/>}/>
                  <Route exact path="/:username/:user_id/DisplayItems" element={<DisplayItems/>}/>
                  <Route exact path="/:username/:user_id/MyCart" element={<MyCart/>}/>
                  <Route exact path="/:username/:user_id/MyOrders" element={<OrderList/>}/>
                   <Route exact path="/:username/:user_id/MyReturns" element={<ReturnList/>}/>
                  <Route exact path="/:username/:user_id/:order_id/Tracking" element={<OrderTracking/>}/>
                </>
                <>
                  <Route exact path="/:username/:user_id/AdvertiserHome" element={<AdvertiserHome/>}/>
                   <Route exact path="/:username/:user_id/createCoupon" element={<CouponForm/>}/>
                   <Route exact path="/:username/:user_id/AdvertiserHome/:coupon_id/edit" element={<CouponEdit/>}/>
                </>

            </Routes>
        </Router>
  );
};

export default App;
