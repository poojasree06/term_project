import React, { useState } from "react";
import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";
import Input from "./Input";
import CustomerNav from "../Header/Header";

export default function Complaint(){

   const [state,setState]=useState({
      complaint:"",
   })

   const {username,user_id } = useParams();
   const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
        ...prevProps,
        [name]: value
        }));
    };

      const handleSubmit = async (e) => {
      e.preventDefault();
      const data={
         ...state,
         seller_id:user_id
      }
      console.log(data)
      axios.post("http://localhost:5000/post_item", data)
         .then(response => {
            console.log(response.data);
               setState({
                  name:"",
                  desc:"",
                  price:"",
                  quantity_added:0,
                  sold_quantity:0,
                  returned_quantity:0,
               })
               navigate(`/${username}/${user_id}/Items`)
            })
         .catch(error => {
            console.error(error);
         });
   };

    return(
      <div>
      <CustomerNav/>
      <div class="product-body">
        <div class="product-container">
        <div class="product-text">POST COMPLAINT</div>
        <form onSubmit={handleSubmit}>
           <div class="product-form-row">
              <div class="input-data textarea">
                 <textarea rows="8" cols="80"name="desc" value={state.desc} 
                 onChange={handleInputChange} required></textarea>
                 <div class="underline"></div>
                 <label for="">Enter Complaint</label>
              </div>
           </div>
         <div class="product-form-row product-submit-btn">
            <div class="input-data">
               <div class="inner"></div>
               <input type="submit" value="submit"/>
            </div>
         </div>
        </form>
     </div>
   </div>
   </div>
    );
}

