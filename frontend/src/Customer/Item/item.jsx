import React from "react";
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";
import './item.css'

export default function Item(props){

    const navigate=useNavigate();
    const {username, user_id } = useParams();
    
    const handleButtonAddCart = e => {
        e.preventDefault();
        const data={
            customer_id:user_id,
            item_id:props.id,
            price:props.price
        }
        axios.post(`http://localhost:5000/post_cart`,data)
        .then((response) => {
        console.log(response.data);
        }).catch((err) => {
            console.error(err);
        });
    }
    const buyItem = async () => {
        try {
         const data={
            customer_id:user_id,
            item_id:props.id,
            quantity:1,
            bill:props.price
         }
         console.log(data)
        const response=await axios.post(`http://localhost:5000/post_order`,data);
        const order_id=response.data._id
        navigate(`/${username}/${user_id}/${order_id}/Payment`)
        } catch (error) {
        console.log(error);
        }
    };

    return(
    <div class="product-card">
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png" alt=""/>
    <h2>{props.name}</h2>
    <p>{props.desc}</p>
    <p><b>Price</b>{" $" +props.price}</p>
    <div class="item-btns">
        <button onClick={(e)=>{
            e.preventDefault();
            buyItem();
        }}  >Buy now</button>
        <button onClick={handleButtonAddCart} >Add to cart</button>
    </div>
    </div>
    );
}


