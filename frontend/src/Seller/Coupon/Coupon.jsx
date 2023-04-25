import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import SellerNav from '../Navbar/navbar';
import CouponCard from "../Coupon/CouponCard";

export default function Coupons(){
    const { username,user_id } = useParams();

    const [coupons, setCoupons] = useState([]);


    useEffect(() => {
        getCoupons();
    }, []);
    
    const getCoupons = async () => {
        const response = await axios.get(`http://localhost:5000/get_coupons/${user_id}`);
        console.log(response.data)
        setCoupons(response.data);
    };

    const deleteCoupon= async (coupon_id) => {
        try {
        console.log('delete',coupon_id)
        await axios.delete(`http://localhost:5000/delete_coupon/${coupon_id}`);
        getCoupons();
        } catch (error) {
        console.log(error);
        }
    };


      return (
   <div>
         <SellerNav/>
     <div className='product-list-body'>
            <div className='product-list-add'>
                <Link  to={`/${username}/${user_id}/createCoupon`}>
                <button className='product-list-button'>Add new Coupon</button> 
                </Link>
            </div>
            {coupons.map((coupon, index) => (
            <CouponCard 
            key={coupon._id} 
            name={coupon.name} 
            discount={coupon.discount}
            date={(coupon.valid_date)}
            deleteCoupon={() => deleteCoupon(coupon._id)}
            Linkto={`${coupon._id}/edit`}
             />
            ))}
        </div>       
   </div>
  );
}
