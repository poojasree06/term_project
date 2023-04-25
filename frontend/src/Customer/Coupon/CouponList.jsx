import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Card from './CouponCard';
import Header from '../Header/Header';
import './list.css'


export default function CouponList(props){
    const { username,user_id,order_id} = useParams();
    const [coupon,setCoupon]=useState([]);
    const [order,setOrder]=useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        getCoupons();
        getOrder();
    }, []);

    const getOrder = async () => {
        const response = await axios.get(`http://localhost:5000/order_by_id/${order_id}`);
        setOrder(response.data);
        console.log(response.data)
    };

    const getCoupons = async () => {
        const response = await axios.get(`http://localhost:5000/get_coupons`);
        setCoupon(response.data);
        console.log(response.data)
    };

    const addCoupon = async (coupon_code,discount) => {
        const data={
            coupon_code,
            discount,
            order_id
        }
        console.log(data)
        const response = await axios.patch(`http://localhost:5000/update_order/${user_id}`,data);
        setOrder(response.data);
        console.log(response.data)
        if (response.status==200){
            navigate(`/${username}/${user_id}/${order_id}/Payment`)
        }

    };


    return(
        <div>
            <Header/>
            <div className='cart-page-body'>
            {coupon.map((c, index) => (
            <Card
            key={c._id} 
            name={c.name}
            discount={c.discount}
            date={c.valid_date}
            addCoupon={
                (e)=>{e.preventDefault();
                    addCoupon(c.name,c.discount)
                }
            }
             />
            ))}
            </div>
        </div>

    );
}
