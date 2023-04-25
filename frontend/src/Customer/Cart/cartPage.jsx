import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Cart from './cart';
import Header from '../Header/Header';
import './cartPage.css'


export default function CartPage(props){
    const [cart, setCart] = useState([]);
    const { username,user_id} = useParams();
    const [items,setItems]=useState([]);
    const [item,setItem]=useState();

   const navigate=useNavigate();
    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        const response = await axios.get(`http://localhost:5000/cart/${user_id}`);
        setCart(response.data);
        console.log(response.data)
    };

    const deleteCart = async (cart_id) => {
        try {
        console.log('delete',cart_id)
        await axios.delete(`http://localhost:5000/delete_cart/${cart_id}`);
        getCart(user_id);
        } catch (error) {
        console.log(error);
        }
    };

    const buyItem = async (cart_id,item_id,quantity,price) => {
        try {
         const data={
            customer_id:user_id,
            item_id:item_id,
            quantity:quantity,
            bill:price
         }
         console.log(data)
        const response=await axios.post(`http://localhost:5000/post_order`,data);
        deleteCart(cart_id);
        console.log(response)
        const order_id=response.data._id
        navigate(`/${username}/${user_id}/${order_id}/Payment`)
        } catch (error) {
        console.log(error);
        }
    };
    return(
        <div>
            <Header/>
            <div className='cart-page-body'>
            {cart.length>0? (cart.map((c, index) => (
            <Cart
            key={c._id} 
            cart_id={c._id}
            customer_id={user_id}
            quantity={c.quantity}
            price={c.price}
            item_id={c.item_id}
            deleteCart={() => deleteCart(c._id)}
            buyItem={() => buyItem(c._id,c.quantity,c.item_id,c.price)}
             />
            ))):<h2>No Items in Cart</h2>}
            </div>
        </div>

    );
}
