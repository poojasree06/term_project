import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";
import SellerNav from "../Navbar/navbar";

export default function Return(props){
   const {username, user_id } = useParams();
   const [returns,setReturns]=useState([])
   const navigate = useNavigate();
   useEffect(() => {
        getReturns();
    }, []);

    const getReturns = async () => {
        const response = await axios.get(`http://localhost:5000/return_items/${user_id}`);
        setReturns(response.data.returns)
        console.log(response.data.returns)
    };

    const updateStatus = async (return_id,val) => {
       const data={status:val,user_id:user_id}
        const response = await axios.patch(`http://localhost:5000/return_status/${return_id}`,data);
        console.log(response.data)
    };

    return(
      <div>
      <SellerNav/>
      {
         returns.map((returnItem,index)=>(
            <div className='product-entry-body'>
            <div className='product-entry-card'>
                  <div className='product-entry-content'>
                     <p className='order-entry-description'><b>returnID</b></p>
                     <p className='order-entry-description' >{returnItem._id} </p>
                  </div>
                  <div className='product-entry-content'>
                     <p className='order-entry-description'><b>Quantity</b> </p>
                     <p className='order-entry-description'>{returnItem.quantity} </p>
                     <p className='order-entry-description'><b>Status</b> </p>
                     <p className='order-entry-description'>{returnItem.status} </p>
                  </div>
                  <div className='product-buttons'>
                     {returnItem.status=="pending" ? 
                     <div>
                     <button className='order-button' onClick={(e)=>{
                        e.preventDefault();
                        updateStatus(returnItem._id,"accepted");
                     }}>Accept</button>
                     <button className='order-button' onClick={(e)=>{
                        e.preventDefault();
                        updateStatus(returnItem._id,"rejected");
                     }}>Reject</button>
                     </div> : <p><b>{returnItem.status}</b></p>}
                  </div>
            </div>
            </div>
         ))
      }

   </div>
    );
}


