import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";
import SellerNav from "../Navbar/navbar";
export default function SellerHome(props){
   const {username, user_id } = useParams();
   const [orders,setOrders]=useState([])
   const navigate = useNavigate();
   useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const response = await axios.get(`http://localhost:5000/orders_by_seller/${user_id}`);
        setOrders(response.data)
        console.log(response.data)
    };

    const sendWarehouse = async (id,item_id) => {
        const data={
            order_id:id,
            item_id:item_id
        }
        const response = await axios.post('http://localhost:5000/post_warehouse_item',data);
        getOrders();
        console.log(response.data)
    };

   const dispatchWarehouse = async (order_id) => {
        const response = await axios.delete(`http://localhost:5000/dispatch_warehouse_item/${order_id}`);
        getOrders();
        console.log(response.data)
    };
    return(
      <div>
      <SellerNav/>
      {
         orders.map((order,index)=>(
            <div className='product-entry-body'>
            <div className='product-entry-card'>
                  <div className='product-entry-content'>
                     <p className='order-entry-description'><b>orderID</b></p>
                     <p className='order-entry-description' >{order._id} </p>
                  </div>
                  <div className='product-entry-content'>
                     <p className='order-entry-description'><b>Status</b> </p>
                     <p className='order-entry-description'>{order.status} </p>
                  </div>
                  <div className='product-buttons'>
                     {order.status=="ordered" ? <button className='order-button' onClick={(e)=>{
                        e.preventDefault();
                        sendWarehouse(order._id,order.item_id)
                     }} >send to warehouse</button>:
                     order.status!="dispatched" ?
                      <button className='order-button' onClick={(e)=>{
                        e.preventDefault();
                        dispatchWarehouse(order._id);
                     }} >dispatch from warehouse</button>:
                     <p><b>completed</b></p>}
         
                  </div>
            </div>
            </div>
         ))
      }

   </div>
    );
}


