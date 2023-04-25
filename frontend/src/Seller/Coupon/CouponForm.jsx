import React from "react";
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import './CouponForm.css'

export default function CouponForm(props){
    const [formData, setFormData] = useState({
        name: '',
        discount:'',
        valid_date: '',   
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    const navigate=useNavigate();

    const {username, user_id} = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
       const data={
         ...formData,
         advertiser_id:user_id
        }
        console.log(data);
        try {
        const response = await axios.post('http://localhost:5000/create_coupon', data);
        console.log(response.data); 
        if (response.status==200){
          navigate(`/${username}/${user_id}/Coupons`)
        }
        } catch (error) {
        console.error(error);
        }
    };
    return(
      <div className="login-body">
      <div class="wrapper">
         <div class="title-text">
            <div class="title login">Create Coupon</div>
         </div>
         <div class="form-container">
            <div class="form-inner">
               <form onSubmit={handleSubmit} class="login">
                  <div class="field ">
                    <input type="text" name="name"  placeholder="Coupon Name" value={formData.name} onChange={handleFormChange}/>
                  </div>
                  <div class="field ">
                    <input type="text" name="discount"  placeholder="Discount %" value={formData.discount} onChange={handleFormChange}/>
                  </div>
                   <div style={{marginTop:"9px",marginBottom:"9px",fontSize:"18px"}}>
                    <b>Validity Date</b>
                  </div>
                  <div class="field" style={{marginTop:"0px"}}>
                    <input type="date" name="valid_date"  placeholder="Account Number" value={formData.valid_date} onChange={handleFormChange}/>
                  </div>
                  <div class="field btn-login">
                     <div class="btn-layer"></div>
                     <input type={"submit"} value="Add Coupon"/>
                  </div>
               </form>

            </div>
         </div>
      </div>
   </div>
    );
}

