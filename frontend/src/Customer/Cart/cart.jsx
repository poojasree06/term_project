import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import trash from './trash-solid.svg'
import plus from './plus-solid.svg'
import minus from './minus-solid.svg'
import './cart.css'

export default function Cart(props){
   
   const [item,setItem]=useState({});
   const [value,setValue]=useState(0);
   const item_id=props.item_id
   const navigate=useNavigate();
   const {username, user_id } = useParams();
   useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const response = await axios.get(`http://localhost:5000/items_by_id/${item_id}`);
        setItem(response.data)
        setValue(props.quantity)
        updateCart(value)
        console.log(response.data)
    };

   const deleteCart = async () => {
        try {
        console.log('delete',props.cart_id)
        const cart_id=props.cart_id
        await axios.delete(`http://localhost:5000/delete_cart/${cart_id}`);
        } catch (error) {
        console.log(error);
        }
        
    };


    const buyItem = async () => {
        try {
         const data={
            customer_id:props.customer_id,
            item_id:props.item_id,
            quantity:props.quantity,
            bill:props.price
         }
         console.log(data)
        const response=await axios.post(`http://localhost:5000/post_order`,data);
        deleteCart();
        const order_id=response.data._id
        navigate(`/${username}/${user_id}/${order_id}/Payment`)
        } catch (error) {
        console.log(error);
        }
    };

    
    const updateCart = async (num) => {
        try {
         const data={
            quantity:num
         }
         console.log(data)
         const cart_id=props.cart_id
        const response=await axios.patch(`http://localhost:5000/update_cart/${cart_id}`,data);
        console.log(response)
        if(response.data.quantity==0){
              deleteCart();
        }
        } catch (error) {
        console.log(error);
        }
    };
            
    return(
      <div className='cart-body'>
        <div className='product-cart'>
            <div className='delete' onClick={props.deleteCart} >
               <img className='cart-icons' src={trash} />
            </div>
            <img className='cart-img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png" alt=""/>
            <div className='product-content'>
               <h1 className='cart-header'>{item.name}</h1>
               <p className='cart-description'>{item.description}</p>
            </div>
            <div className='quantity'>
            <img className='cart-icons'src={minus} onClick={(e)=>{
               e.preventDefault();
               updateCart(-1)
            }} />
            <p>{props.quantity}</p>
            <img className='cart-icons' src={plus} onClick={(e)=>{
               e.preventDefault();
               updateCart(1)
            }}/>
            </div>
            <div className='cart-buttons'>
               <h3 className='cart-price'>${props.price}</h3>
               <button className='buy-now' onClick={
                  (e)=>{
                     e.preventDefault();
                     buyItem();
               }}>Buy Now</button>
            </div>
        </div>
      </div>
    );
}
