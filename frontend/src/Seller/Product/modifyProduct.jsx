import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Input";
import SellerNav from '../Navbar/navbar';
import './product.css'

export default function ModifyProduct(){
   //  const [state, setState] = useState({
   //      item_name: "",
   //      price:"",
   //      added_qty:"",
   //      item_desc:""
   //  });

   const [state,setState]=useState({
      name:"",
      desc:"",
      price:"",
      quantity_added:0,
      sold_quantity:0,
      returned_quantity:0,
   })

    const navigate = useNavigate();
    const { username,user_id,item_id } = useParams();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
        ...prevProps,
        [name]: value
        }));
    };

    useEffect(() => {
        getProductById();
    }, []);
    
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/items_by_id/${item_id}`);
        setState(response.data)
        console.log(response.data)
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.patch(`http://localhost:5000/update_item/${item_id}`, state);
         navigate(`/${username}/${user_id}/Items`);
        } catch (error) {
        console.log(error);
        }
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

