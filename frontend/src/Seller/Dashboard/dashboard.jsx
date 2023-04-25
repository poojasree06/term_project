import React, { useState, useEffect } from "react";
import SellerNav from '../Navbar/navbar';
import { useParams } from "react-router-dom";
import axios from "axios";
import './dashboard.css'

export default function Dashboard(){

    const { username,user_id } = useParams();
    const [shipments,setShipments]=useState([]);
    const [total_items,setTotal_items]=useState(0)
    const [sold_items,setSold_items]=useState(0)
    const [return_items,setReturned_items]=useState(0)
    const [warehouse_item,setWarehouse_item]=useState(0)

    useEffect(() => {
        getItemsInfo();
        getShipments();
    }, []);

    // const getItemsInfo = async () => {
    //     const response = await axios.get(`http://localhost:5000/items_info/${user_id}`);
    //     console.log(response.data[0])
    //     setSold_items(response.data[0].sold_qty);
    //     setTotal_items(response.data[0].available_qty);
    //     setReturned_items(response.data[0].returned_qty);
    // };

    const getItemsInfo = async () => {
        const response = await axios.get(`http://localhost:5000/items_info/${user_id}`);
        console.log(response.data[0])
        setSold_items(response.data[0].sold_qty);
        setTotal_items(response.data[0].quantity_added-response.data[0].sold_qty+response.data[0].returned_qty);
        setReturned_items(response.data[0].returned_qty);
    };

    const getShipments = async () => {
        const response = await axios.get(`http://localhost:5000/get_shipments/${user_id}`);
        console.log(response.data)
        setShipments(response.data)
    };

    const arrive_warehouse=async (item_id,_id)=>{
        // update shipment status to 1
        console.log(item_id)
        const data={
            item_id,
            shipment_id:_id
        }
        axios.post("http://localhost:5000/item_arriveAt_warehouse", data)
        .then(response => {
            console.log(response.data);
            setWarehouse_item(response.data.warehouse_item_id)
        })
        .catch(error => {
            console.error(error);
        });
    }

    const dispatch_warehouse=async (item_id,_id)=>{
        // update shipment status to 1
        console.log(item_id)
        const data={
            item_id,
            shipment_id:_id
        }
        axios.post("http://localhost:5000/item_dispatch_warehouse", data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }


      return (
   <div className='dashboard-body'>
    <SellerNav/>
    <div className='dashboard-total-amount'>
        <h3>Total Amount</h3>
        <p className='d-amount'>$150000</p>
    </div>
    <div className='dashboard-items'>
        <div className='dashboard-box total-items'>
            <div><p className='d-titles'><b>Items Available</b></p></div>
            <div><p className='d-titles'>{total_items}</p></div>
        </div>
        <div className='dashboard-box items-sold'>
            <div><p className='d-titles'><b>Items Sold</b></p></div>
            <div><p className='d-titles'>{sold_items}</p></div>
        </div>
        <div className='dashboard-box total-returns'>
            <div><p className='d-titles'><b>Returned</b></p></div>
            <div><p className='d-titles'>{return_items}</p></div>
        </div>

    </div>
    <div className=''>
    {shipments.map((shipment, index) => (
    <div>
        <div>shipment_id {shipment._id}</div>
        <div>created at {new Date(shipment.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})}
        </div>{
        }
        {shipment.status=="0"?
        <button 
        onClick={(e)=>{
            e.preventDefault()
            arrive_warehouse(shipment.item_id,shipment._id)}}>arrive at warehouse</button>
        :shipment.status=="1"?
        <button  
        onClick={(e)=>{
            e.preventDefault()
            dispatch_warehouse(shipment.item_id,shipment._id)}}>
        dispatch from warehouse</button>
            :<div>dispatched</div>
        }
    </div>
    ))}

    </div>
   </div>
  );
}
