import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate,useParams } from "react-router-dom";
import Header from '../Header/Header';
import './tracking.css'


export default function OrderTracking(props){

  const [iteminfo, setIteminfo] = useState([]);
  const {username,user_id,order_id } = useParams();

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const response = await axios.get(`http://localhost:5000/order_details/${order_id}`);
        setIteminfo(response.data);
        console.log(response.data)
    };

    return(
        <div>
        <Header/>
        <div className='order-track-body'>
          <div class="order-card">
            <div class="order-title">Order Reciept - {iteminfo.order_id}</div>
            <div class="order-pricing">
                <div class="row">
                    <div class="col-9">
                        <span id="name">Order Date</span>  
                    </div>
                    <div class="col-3">
                        <span id="price">{new Date(iteminfo.order_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
                    </div>
                    <div class="col-9">
                        <span id="name">Item name</span>  
                    </div>
                    <div class="col-3">
                        <span id="price">{iteminfo.item_name}</span>
                    </div>
                    <div class="col-9">
                        <span id="name">Number of Items</span>  
                    </div>
                    <div class="col-3">
                        <span id="price">{iteminfo.quantity}</span>
                    </div>
                    <div class="col-9">
                        <span id="name">Total Amount</span>  
                    </div>
                    <div class="col-3">
                        <span id="price">${iteminfo.bill}</span>
                    </div>
                    {iteminfo.discount ? 
                    <div class="row">
                        <div class="col-9">
                            <span id="name">Total Amount</span>  
                        </div>
                        <div class="col-3">
                            <span id="price">${iteminfo.bill}</span>
                        </div>
                        <div class="col-9">
                            <span id="name">Discounted Amount</span>  
                        </div>
                        <div class="col-3">
                            <span id="price">${(parseFloat(iteminfo.discount)*parseFloat(iteminfo.bill))/100}</span>
                        </div>
                    </div>:null

                    }

                </div>
            </div>
            <div class="order-total">
                <div class="row">
                     {iteminfo.discount ? 
                     <div>
                    <div class="col-9">Total bill</div>
                    <div class="col-3"><big>&pound;{parseFloat(iteminfo.bill)-(parseFloat(iteminfo.discount)*parseFloat(iteminfo.bill))/100}</big></div>
                    </div>:  <div class="row">
                    <div class="col-9">Total bill</div>
                    <div class="col-3"><big>&pound;{iteminfo.bill}</big></div>
                    </div>

                     }
                </div>
            </div>
            {/* <div class="order-tracking">
                <Link to={`././MyOrders`}> <div class="order-title">Go To Orders</div></Link>
               
            </div> */}
        </div>
         </div>
    </div>
    );
}
