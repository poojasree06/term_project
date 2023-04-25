import React, { useState } from "react";
import axios from "axios";
import { Link,useParams,useNavigate } from "react-router-dom";
import Input from "./Input";
import SellerNav from '../Navbar/navbar';
import './product.css'

export default function Item(){
//     const [state, setState] = useState({
//         item_name: "",
//         price:0.0,
//         available_qty:0,
//         item_desc:"",
//     });
   const [state,setState]=useState({
      name:"",
      desc:"",
      price:"",
      quantity_added:0,
      sold_quantity:0,
      returned_quantity:0,
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

//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(state)
//     const data={
//         item_name: state.item_name,
//         price:parseFloat(state.price),
//         added_qty:parseInt(state.available_qty),
//         item_desc:state.item_desc,
//         seller_id:user_id
//     }
//    console.log(data)
//    axios.post("http://localhost:5000/post_items", data)
//       .then(response => {
//          console.log(response.data);
//             setState({
//             item_name: "",
//             price:"",
//             added_qty:0,
//             item_desc:"",
//             })
//             navigate(`/${username}/${user_id}/Items`)
//          })
//       .catch(error => {
//          console.error(error);
//       });
//   };

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
      <SellerNav/>
      <div class="product-body">
        <div class="product-container">
        <div class="product-text">CREATE PRODUCT</div>
        <form onSubmit={handleSubmit}>
           <div class="product-form-row">
              <Input name="name" inputName="Product Name" value={state.name} 
              onChange={handleInputChange}/>
           </div>
           <div class="product-form-row">
              <Input name="price" inputName="Product Price" value={state.price} 
              onChange={handleInputChange}/>
              <Input name="quantity_added" inputName="Product Quantity" value={state.quantity_added} 
              onChange={handleInputChange}/>
           </div>
           <div class="product-form-row">
              <div class="input-data textarea">
                 <textarea rows="8" cols="80"name="desc" value={state.desc} 
                 onChange={handleInputChange} required></textarea>
                 <div class="underline"></div>
                 <label for="">Product Description</label>
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

