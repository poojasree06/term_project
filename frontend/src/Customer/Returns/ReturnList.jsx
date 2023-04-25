import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import Return from './ReturnCard.jsx';
import CustomerNav from "../Header/Header.jsx";
import './returnlist.css'

export default function ReturnList(props){

    const [returns, setReturns] = useState([]);
    const { username,user_id } = useParams();

    useEffect(() => {
        getReturns();
        updateReturns();
    }, []);
    
    const getReturns = async () => {
        const response = await axios.get(`http://localhost:5000/returns_by_customer/${user_id}`);
        console.log(response.data)
        setReturns(response.data);
    };

    const updateReturns = async () => {
        const response = await axios.get(`http://localhost:5000/returns_by_customer/${user_id}`);
        console.log(response.data)
        setReturns(response.data);
    };


    return(
    <div>
        <CustomerNav/>
            {returns.length>0? (returns.map(( returnItem, index) => (
            <Return 
            return_id={returnItem._id} 
            date={returnItem.returned_at}
            status={returnItem.status}
            item_id={returnItem.item_id}
            order_id={returnItem.order_id}
            customer_id={returnItem.customer_id}
             />
            ))):<h2>No Returns</h2>}
    </div>       
    );
}
