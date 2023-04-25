import React from "react";
import axios from 'axios';
import {  Link,useNavigate } from 'react-router-dom'
import { useState} from "react";
import Form from 'react-bootstrap/Form';
import './signUp.css'

export default function Register(props){

    const navigate=useNavigate();
    const [type,setType]=useState("");
    const [bank,setBank]=useState("");
    const [formData, setFormData] = useState({
        name:'',
        password: '',
        email: '',
        account_number:'',
        phone:'',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const link='http://localhost:5000/post_'+type
        console.log(link)
        axios.post(link, formData)
            .then(response => {
                console.log(response.data);
                setFormData({
                    name:'',
                    username: '',
                    password: '',
                    email: '',
                    account_number:'',
                    phone:'',
                });
                navigate('/Login')
                })
            .catch(error => {
                console.error(error);
            })
    }

    return(
        <div className="register-body">
        <div class="wrapper">
         <div class="title-text">
            <div class="title signup">Signup</div>
         </div>
         <div class="form-container">
            <div class="form-inner">
               <form onSubmit={handleSubmit} class="signup">
                <div class="field">
                    <Form.Select style={{height:"50px", marginTop:"10px"}} aria-label="select user" value={type}  onChange={e => {
            console.log(e.target.value);
            setType(e.target.value);
          }} >
                    <option>User Type</option>
                    <option value="customer" >Customer</option>
                    <option value="seller" >Seller</option>
                    <option value="advertiser" >Advertiser</option>
                    </Form.Select>
                </div>
                  <div class="field">
                     <input type="text" placeholder="Name" name="name" value={formData.name} 
              onChange={handleChange} required/>
                  </div>
                <div class="field">
                     <input type="text" placeholder="Phone Number" name="phone" value={formData.phone}
              onChange={handleChange} required/>
                  </div>
                  <div class="field">
                     <input type="email" placeholder="Email Address" name="email" value={formData.email} 
              onChange={handleChange} required/>
                  </div>
                {/* <Form.Select style={{height:"50px", marginTop:"10px"}} aria-label="select bank"  value={bank ||"Select"}  onChange={e => {
                    console.log(e.target.value);
                    setBank(e.target.value);
                }} >
                            <option>Select Bank Name</option>
                            <option value="Bank A" >Bank A</option>
                            <option value="Bank B" >Bank B</option>
                            <option value="Bank C" >Bank C</option>
                </Form.Select>
                <div class="field">
                     <input type="text" placeholder="Account Number" name="account" value={formData.account_number} 
              onChange={handleChange} required/>
                  </div> */}
                  <div class="field">
                     <input type="password" placeholder="Password" name="password" value={formData.password} 
              onChange={handleChange} required/>
                  </div>
                  {type=="advertiser"?
                  <div>
                    <div class="field">
                        <input type="text" placeholder="Account Number" name="account" value={formData.account_number} 
                        onChange={handleChange} required/>
                    </div>
                  </div>:null
                  }
                  <div class="field btn-login">
                     <div class="btn-layer"></div>
                     <input type={"submit"} value="Signup"/>
                  </div>
                  <div class="signup-link">
                     Already have an account? <Link to={"/Login"}>Login</Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
    </div> 
    );
}

