import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import ProductCard from './productCard';
import SellerNav from '../Navbar/navbar';
import './productList.css'

export default function ProductList(props){

    const [products, setProduct] = useState([]);
    const { username,user_id } = useParams();

    useEffect(() => {
        getProducts();
    }, []);
    
    const getProducts = async () => {
        const response = await axios.get(`http://localhost:5000/items_by_seller/${user_id}`);
        console.log(response.data)
        setProduct(response.data);
    };

    const deleteProduct = async (item_id) => {
        try {
        console.log('delete',item_id)
        await axios.delete(`http://localhost:5000/delete_item/${item_id}`);
        getProducts();
        } catch (error) {
        console.log(error);
        }
    };


    return(
    <div>
        <SellerNav/>
        <div className='product-list-body'>
            <div className='product-list-add'>
                <Link  to={`/${username}/${user_id}/createItem`}>
                <button className='product-list-button'>Add new item </button> 
                </Link>
            </div>
            {products.map((product, index) => (
            <ProductCard 
            key={product._id} 
            name={product.name} 
            description={product.desc}
            quantity={product.quantity_added}
            price={parseFloat(product.price)}
            deleteProduct={() => deleteProduct(product._id)}
            Linkto={`${product._id}/edit`}
             />
            ))}
        </div>       
    </div>
    );
}
