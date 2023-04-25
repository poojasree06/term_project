import React from "react";
import axios from 'axios';
import {  json, Link,useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import './login.css'

export default function Login(props){

    const [state, setState] = useState({
        email: "",
        password: "",
        usertype:"Seller"
    });
    const navigate=useNavigate();


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
        ...prevProps,
        [name]: value
        }));
    };

    useEffect(() => {
        handleSubmit();
    }, []);
    
    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log(state);
         const data={
            email:state.email,
            password:state.password
         }
         try {
               console.log(data);
               const link="http://localhost:5000/verify_"+state.usertype
               axios.post(link, data)
                .then(response => {
                    console.log(response.data);
                  //   if (response.data.status==false){
                  //       navigate('/Login')
                  //   }else{
                  //       // const username=response.data.user.name
                  //       // const user_id=response.data.user.id
                  //       // navigate(`/${username}/${user_id}/${state.usertype}Home`);
 
                  //   }
                     console.log(response.data._id)
                     const username=response.data.name
                     const user_id=response.data._id
                     navigate(`/${username}/${user_id}/${state.usertype}Home`);
                })
                .catch(error => {
                    console.error(error);
                    
            });
               
         } catch (error) {
            console.log(error);
         }
    };


    return(
      <div className="login-body">
      <div class="wrapper">
         <div class="title-text">
            <div class="title login">Login</div>
         </div>
         <div class="form-container">
            <div class="form-inner">
               <form onSubmit={handleSubmit} class="login">
                  <div class="radio-check-buttons">
                     <div class="radio-check">
                        <input class="radio-check-input" type="radio"  value="Seller" onChange={handleInputChange} name="usertype"  id="seller1" checked={state.usertype=="Seller"}  />
                        <label class="radio-check-label" for="seller1">
                        Seller
                        </label>
                     </div>
                     <div class="radio-check">
                        <input class="radio-check-input" type="radio" value="Customer" onChange={handleInputChange} name="usertype" id="customer1" checked={state.usertype=="Customer"}/>
                        <label class="radio-check-label" for="customer1">
                        Customer
                        </label>
                     </div>
                        <div class="radio-check">
                        <input class="radio-check-input" type="radio" value="Advertiser" onChange={handleInputChange} name="usertype" id="advertiser1" checked={state.usertype=="Advertiser"}/>
                        <label class="radio-check-label" for="advertiser1">
                        Advertiser
                        </label>
                     </div>
                  </div>
                  <div class="field">
                     <input name="email" type={"email"} placeholder="Email Address" value={state.user} onChange={handleInputChange}  required/>
                  </div>
                  <div class="field">
                     <input name="password"  type={"password"} placeholder="Password" value={state.password} onChange={handleInputChange}  required/>
                  </div>
                  <div class="pass-link">
                     <a href="#">Forgot password?</a>
                  </div>
                  {/* <Link to={"/Product"}> */}
                  <div class="field btn-login">
                     <div class="btn-layer"></div>
                     <input type={"submit"} value="Login"/>
                  </div>
                  {/* </Link> */}
                  <div class="signup-link">
                     Not a member? <Link to={"/"}>Signup now</Link>
                  </div>
               </form>

            </div>
         </div>
      </div>
   </div>
    );
}

