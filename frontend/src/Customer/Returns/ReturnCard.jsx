import { Link } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";
import './returncard.css'

export default function Return(props){

    const [iteminfo, setIteminfo] = useState([]);
    const {username,user_id} = useParams();

      useEffect(() => {
          getItems();
      }, []);

      const getItems = async () => {
          const order_id=props.order_id
          console.log(order_id)
          const response = await axios.get(`http://localhost:5000/order_details/${order_id}`);
          setIteminfo(response.data);
          console.log(response.data)
      };

       const returnItem = async () => {
          const order_id=props.order_id
          const item_id=props.item_id
          console.log(order_id)
          console.log(item_id)
          const data={order_id,item_id}
          const response = await axios.post(`http://localhost:5000/return_item`,data);
          console.log(response.data)
      };
    return(
      <div className='product-entry-body'>
        <div className='product-entry-card'>
            <img className='product-img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png" alt=""/>
            <div className='product-entry-content'>
                <p className='product-entry-description'><b>Return Date</b></p>
                <p className='product-entry-description'><b>Item Name :</b></p>
                <p className='product-entry-description'><b>Price :</b> ${iteminfo.bill}</p>
                <p className='product-entry-description'><b>Return Status</b></p>
            </div>
            <div className='product-entry-content'>
              <p className='product-entry-description'>{new Date(props.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})}</p>
              <p className='product-entry-description'>{iteminfo.item_name}</p>
               <p className='product-entry-description'><b>Quantity :</b> {iteminfo.quantity}</p>
               {props.status=="rejected"  ? <button>File Complaint</button>: <p className='product-entry-description'>{props.status}</p>
              }
              
            </div>

        </div>
      </div>
    );
}
