import React from "react";
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import './payment.css'

export default function Payment(props){
    const [bank,setBank]=useState("")
    const [order,setOrder]=useState([])
    const [formData, setFormData] = useState({
        amount: '',
        bank_name:'',
        account_number: '',
    });
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    const navigate=useNavigate();

   //   const {username, user_id,item_id } = useParams();
    const {username, user_id,order_id } = useParams();
    console.log(order_id)
    useEffect(() => {
        getOrder();
        handleSubmit();
    }, []);

    const getOrder = async () => {
        const response = await axios.get(`http://localhost:5000/order_by_id/${order_id}`);
        setOrder(response.data);
        console.log(response.data)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
       const data={
         ...formData,
         amount:order.bill,
         customer_id:user_id,
         quantity:order.quantity,
         item_id:order.item_id
        }
        console.log(data);
        try {
          console.log('payments')
        const response = await axios.post('http://localhost:5000/payments', data);
        console.log(response.data); // display payment confirmation message
        if (response.status==200){
          navigate(`/${username}/${user_id}/${order_id}/Tracking`)
        }
        } catch (error) {
        console.error(error);
        }
    };
    return(
      <div className="login-body">
      <div class="wrapper">
         <div class="title-text">
            <div class="title login">Payment</div>
         </div>
          <div class="title-text">
            <div class="title" style={{fontSize:"19px"}}>{order.quantity} items</div>
         </div>
         <div class="form-container">
            <div class="form-inner">
               <form onSubmit={handleSubmit} class="login">
                 <div class="pay" >
                   Amount to Pay<span className="pay-amount"> ${order.bill}</span> 
                  </div>

                  <div class="field ">
                    <input type="text" name="bank_name"  placeholder="Bank Name" value={formData.bank_name} onChange={handleFormChange}/>
                  </div>
                  <div class="field ">
                    <input type="text" name="account_number"  placeholder="Account Number" value={formData.account_number} onChange={handleFormChange}/>
                  </div>
                  <div class="field btn-login">
                     <div class="btn-layer"></div>
                     <input type={"submit"} value="Pay Now"/>
                  </div>
               </form>

            </div>
         </div>
      </div>
   </div>
    );
}

