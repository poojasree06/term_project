const express = require('express');
const mongoose = require('mongoose');
const {Seller,Customer,Item,Account,Cart,Order,Warehouse,WarehouseItem,Return,Complaint, Advertiser,Bank,Coupon} =require('../models/projectSchema.js')
const router = express.Router();

//creates a new seller with the provided data. The new seller is returned in the response.
router.post("/post_seller",(req,res)=>{
    const data=req.body
    console.log(data)
    Seller.create(data)
    .then((response) => {
      console.log(`seller with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

//verifies the seller's login information and returns the seller.
router.post('/verify_seller', (req, res) => {
  const data = req.body;
  Seller.findOne(data)
  .then((response) => {
      console.log(`seller with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
});

//creates a new item with the provided data. The new item is returned in the response.
router.post("/post_item",(req,res)=>{
    const data=req.body
    console.log(data)
    Item.create(data)
    .then((response) => {
      console.log(`item with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

//deletes the item with the given ID.
router.delete("/delete_item/:item_id",(req, res) => {
  Item.deleteOne({_id:req.params.item_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

//returns the item with the given ID.
router.get("/items_by_id/:item_id",(req, res) => {
  const item_id=req.params.item_id
  Item.findOne({_id:item_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})


//returns all items for the given seller.
router.get("/items_by_seller/:seller_id",(req, res) => {
  const seller_id=req.params.seller_id
  Item.find({seller_id:seller_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

//aggregates and returns quantity and sold items for the given seller.
router.get("/items_info/:seller_id", (req, res) => {
  const seller_id = req.params.seller_id;
  Item.aggregate([
    {$match: {seller_id: new mongoose.Types.ObjectId(seller_id)}},
    {$group: {  _id: null,
                 quantity_added: {$sum: "$quantity_added"},
                 sold_qty: {$sum: "$sold_quantity"},
                 returned_qty:{$sum: "$returned_quantity"}
                }},
  ]).then((updatedItem) => {
    res.status(200).json(updatedItem);
    })
    .catch((err) => {
    res.status(404).json({ message: "Item not found" });
    });
}); 


// updates the item with the given ID with the provided data.
router.patch('/update_item/:item_id', (req, res) => {
  const item_id = req.params.item_id;
  const data=req.body
    Item.findOneAndUpdate(
    { _id: item_id },
    { $set: data },
    { new: true }
    )
    .then((updatedItem) => {
    res.status(200).json(updatedItem);
    })
    .catch((err) => {
    res.status(404).json({ message: "Item not found" });
    });
});

// retrieves all orders for the given seller ID.
const findSellerOrders = async (req,res) => {
 try{
    const seller_id=req.params.user_id
    // find all items with the given seller_id
    const items = await Item.find({ seller_id });
    console.log(items)
    // get all order ids where item_id matches one of the items found above
    const order_ids = await Order.find({ item_id: { $in: items.map(item => item._id) } }).distinct("_id");
    console.log(order_ids)
    // find all orders with the above order ids
    const orders = await Order.find({ _id: { $in: order_ids } });
    console.log(orders)
    res.status(200).json(orders)
 }catch(err){
    console.log(err)
 }
};
router.get("/orders_by_seller/:user_id",findSellerOrders)


/* Warehouse */
//creates a new warehouse with the provided data.
router.post("/post_warehouse",(req,res)=>{
    const data=req.body
    Warehouse.create(data)
    .then((response) => {
      console.log(` id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

//creates a new warehouse item with the provided data and assigns it to the random warehouse. It then updates the order status for the given order ID to "arrived".
router.post("/post_warehouse_item",(req,res)=>{
    const data=req.body    // {order_id,item_id}
    //create warehouse item
    WarehouseItem.create(data)
    .then((response) => {
      console.log(` id ${response._id}.`);
      Warehouse.aggregate([{ $sample: { size: 1 } }])
      .then((randomWarehouse) => { 
              // update in warehouse item
              WarehouseItem.updateOne({ "_id": response._id },
                      { $set: { warehouse :randomWarehouse[0]._id } })
              .then((result) => {
                  console.log("Successfuly updated warehouse item");
                  // update order status
                    Order.updateOne({ "_id": data.order_id },
                      { $set: { status :"arrived" } })
                    .then((result1) => {
                        console.log("arrvied status");
                        res.status(200).json({response,result1,result});
                    }).catch((err) => {
                        console.error(err);
                    });  
              }).catch((err) => {
                  console.error(err);
              });  

      }).catch((err) => {
          console.error(err);
      })
    }).catch((err) => {
        console.error(err);
    });
})


//deletes the warehouse item for the given order ID and updates the order status to "dispatched".
router.delete("/dispatch_warehouse_item/:order_id",(req,res)=>{
    const data=req.params
    WarehouseItem.deleteOne({order_id:data.order_id})
    .then((response) => {
      console.log(response);
      Order.updateOne({ "_id": data.order_id },
                      { $set: { status:"dispatched" } })
      .then((result) => {
        console.log("Successfuly updated order status");
        res.status(200).json({response,result});
      }).catch((err) => {
          console.error(err);
      });  
    }).catch((err) => {
        console.error(err);
    });
})


// sends an SMS message with an OTP to a hardcoded phone number using Twilio.
const accountSid = 'AC136d33e48a2535fa586bc0574b97832c';
const authToken = '60f359902397dc6ed84af0a58e432959';
const client = require('twilio')(accountSid, authToken);

router.get("/send_otp",(req,res)=>{
    //customer id
    Order.find({status:"dispatched"})
    .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
  client.messages
  .create({
     body: 'Here is your OTP: 1234',
     from: '+16813219753', // Twilio phone number
     to: '+15558675310' // customer phone number
   })
  .then(message => console.log(message.sid));
})

//returns all items for the given seller that have been returned by customers.
router.get("/return_items/:user_id",(req,res)=>{
    const seller_id=req.params.user_id
    Item.find({seller_id:seller_id})
        .then((response)=>{
            const itemIds = response.map(item => item._id);
            Return.find({item_id: {$in: itemIds}})
                .then((returns) => {
                    res.status(200).json({response, returns});
                })
                .catch((err) => {
                    console.error(err);
                });         
    }).catch((err) => {
        console.error(err);
    });         
})

//updates the return status for the given return ID. If the status is "accepted", it should return the money to the customer.
router.patch("/return_status/:return_id",(req,res)=>{
    const id=req.params.return_id;
    const data=req.body // status 
    Return.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
    )
    .then((updated) => {
      // todo if status == accepted give money back
    res.status(200).json(updated);
    })
    .catch((err) => {
    res.status(404).json({ message: "Return not found" });
    });  
})


module.exports=router