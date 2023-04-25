const express = require('express');
const mongoose = require('mongoose');
const {Seller,Customer,Item,Account,Cart,Order,Warehouse,WarehouseItem,Return,Complaint, Advertiser,Bank,Coupon} =require('../models/projectSchema.js')
const router = express.Router();

router.post("/post_advertiser",(req,res)=>{
    const data=req.body
    console.log(data)
    Advertiser.create(data)
    .then((response) => {
      console.log(`advertiser with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

router.post('/verify_advertiser', (req, res) => {
  const data = req.body;
  console.log(data)
  Advertiser.findOne(data)
  .then((response) => {
      console.log(`advertiser with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
});


router.post("/create_coupon",(req,res)=>{
    const data=req.body
    console.log(data)
    Coupon.create(data)
    .then((response) => {
      console.log(`item with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})


router.get("/get_coupons/:user_id",(req,res)=>{
    Coupon.find({advertiser_id:req.params.user_id})
    .then((response) => {
      console.log(`${response}`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})


router.get("/coupon_by_id/:coupon_id",(req,res)=>{
  console.log(req.params)
  const coupon_id=req.params.coupon_id
  Coupon.findOne({_id:coupon_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

router.delete("/delete_coupon/:coupon_id",(req,res)=>{
    Coupon.deleteOne({_id:req.params.coupon_id})
    .then((response) => {
      console.log(`Coupon deleted ${response}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

router.patch("/update_coupon/:coupon_id",(req,res)=>{
    Coupon.updateOne({_id:req.params.coupon_id},{$set:req.body})
    .then((response) => {
      console.log(`Coupon updated ${response}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})


module.exports=router