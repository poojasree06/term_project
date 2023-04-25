import React from 'react';
import { Link } from "react-router-dom";
import './productCard.css'

export default function ProductCard(props){
    return(
      <div className='product-entry-body'>
        <div className='product-entry-card'>
            <img className='product-img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png" alt=""/>
            <div className='product-entry-content'>
                <p className='product-entry-description'><b>{props.name}</b></p>
            </div>
            <div className='product-entry-content'>
               <p className='product-entry-description'><b>Price:</b> ${props.price}</p>
               <p className='product-entry-description'><b>Quantity:</b> {props.quantity}</p>
            </div>
            <div className='product-buttons'>
              <Link to={props.Linkto}>
                <button className='product-button'>Modify</button>
              </Link>
               {/* <button className='product-button' onClick={props.ModifyProduct}>Modify</button> */}
               <button className='product-button' onClick={props.deleteProduct} >Delete</button>
            </div>
        </div>
      </div>
    );
}
