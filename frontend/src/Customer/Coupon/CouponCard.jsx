import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import './card.css'


export default function Card(props){
   
   const navigate=useNavigate();
   const {username, user_id } = useParams();

    return(
      <div className='cart-body'>
        <div className='product-cart'>
            <div className='product-content'>
               <h1 className='cart-header'>Coupon Code</h1>
               <p className='cart-description'>{props.name}</p>
            </div>
            <div className='product-content'>
               <h1 className='cart-header'>Discount</h1>
               <p className='cart-description'>{props.discount}%</p>
            </div>
            <div className='product-content'>
               <h1 className='cart-header'>Validity</h1>
               <p className='cart-description'>{props.date}</p>
            </div>
            <div className='cart-buttons'>
               <button onClick={props.addCoupon}>Apply</button>
            </div>
        </div>
      </div>
    );
}

