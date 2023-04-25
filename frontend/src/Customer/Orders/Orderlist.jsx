import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import Order from './OrderCard.jsx';
import CustomerNav from "../Header/Header.jsx";
import './orderlist.css'

export default function OrderList(props){

    const [products, setProduct] = useState([]);
    const { username,user_id } = useParams();

    useEffect(() => {
        getOrders();
    }, []);
    
    const getOrders = async () => {
        const response = await axios.get(`http://localhost:5000/orders_by_customer/${user_id}`);
        console.log(response.data)
        setProduct(response.data);
    };

    const returnItem = async (order_id,item_id) => {

          const data={order_id,item_id,customer_id:user_id}
          const response = await axios.post(`http://localhost:5000/return_item/${user_id}`,data);
          getOrders();
          console.log(response.data)
    };


    return (
    <div>
        <CustomerNav />
        {products.map((product, index) =>
        product.status !== "returned" ? (
            <Order
            order_id={product._id}
            item_id={product.item_id}
            tracking={`/${username}/${user_id}/${product._id}/Tracking`}
            getOrders={getOrders}
            />
        ) : null
        )}
    </div>
    );

}
