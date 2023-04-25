import React from 'react';
import { Link } from "react-router-dom";
import './CouponCard.css'

export default function CouponCard(props){
    return(
      <div className='product-entry-body'>
        <div className='coupon-entry-card'>
            <div className='coupon-entry-content'>
                <p className='coupon-entry-description'><b>Coupon Name</b></p>
                <p className='coupon-entry-description'><b>Discount</b></p>
                <p className='coupon-entry-description'><b>Expiry Date</b></p>
            </div>
            <div className='coupon-entry-content'>
                <p className='coupon-entry-description'>{props.name}</p>
                <p className='coupon-entry-description'>{props.discount}</p>
                <p className='coupon-entry-description'>{props.date}</p>
            </div>
            <div className='coupon-buttons'>
              <Link to={props.Linkto}>
                <button className='coupon-button'>Modify</button>
              </Link>
               <button className='coupon-button' onClick={props.deleteCoupon} >Delete</button>
            </div>
        </div>
      </div>
    );
}
