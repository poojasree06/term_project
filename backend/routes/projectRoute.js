const express = require('express');
const mongoose = require('mongoose');
const {Seller,Customer,Item,Account,Cart,Order,Warehouse,WarehouseItem,Return,Complaint, Advertiser,Bank,Coupon} =require('../models/projectSchema.js')
const router = express.Router();


router.post("/post_customer",(req,res)=>{
    const data=req.body
    console.log(data)
    Customer.create(data)
    .then((response) => {
      console.log(`customer with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

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

router.post('/verify_customer', (req, res) => {
  const data = req.body;
  Customer.findOne(data)
  .then((response) => {
      console.log(`customer with id ${response._id}.`);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
});


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

router.post("/post_cart", (req, res) => {
  const data = req.body;
  console.log(data);
  Cart.findOne({ item_id: data.item_id })
    .then((cartItem) => {
      if (cartItem) {
        // Item already exists in cart, update quantity and price
        cartItem.quantity += 1;
        const price_prev = (cartItem.price);
        const price_new=data.price;
        const result=parseFloat(price_new)+parseFloat(price_prev)
        cartItem.price = result;
        cartItem.save();
        console.log(`Cart item with id ${cartItem._id} has been updated.`);
        res.status(200).json(cartItem);
      } else {
        // Item doesn't exist in cart, create new cart item with quantity = 1
        data.quantity = 1;
        Cart.create(data)
          .then((cartItem) => {
            console.log(`Cart item with id ${cartItem._id} has been created.`);
            res.status(200).json(cartItem);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});


router.get("/cart/:user_id",(req, res) => {
  Cart.find({customer_id:req.params.user_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

router.delete("/delete_cart/:cart_id",(req, res) => {
  Cart.deleteOne({_id:req.params.cart_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

router.patch("/update_cart/:cart_id",(req, res) => {
  Cart.findOne({_id:req.params.cart_id})   
   .then((cart) => { 
      Item.findOne({_id:cart.item_id}).then((item)=>{
        const price=item.price
        cart.quantity+=req.body.quantity
        cart.price=parseFloat(price*cart.quantity)
        cart.save().then((response)=>{
            res.status(200).json(response)
        }).catch((err) => {
          console.error(err);
        });
      })
    }).catch((err) => {
        console.error(err);
    });
})


router.get("/all_items",(req, res) => {
  Item.find({})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

router.delete("/delete_item/:item_id",(req, res) => {
  Item.deleteOne({_id:req.params.item_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})


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

/* Order */
// TODO otp change
// buy now
router.post("/post_order",(req,res)=>{
    const data=req.body
    console.log(data)
    Order.create({...data,otp:"123456"})
    .then((response) => {
      console.log(`order with id ${response._id}.`);

      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})
// cart buy now
router.post("/post_order/:user_id",(req,res)=>{
    const customer_id=req.params.user_id
    const data={
        customer_id:customer_id,
        item_id:req.body.item_id,
        quantity:req.body.quantity,
        bill:req.body.bill,
        otp:"abc123"
    }
    Order.create(data)
    .then((response) => {
      console.log(`order with id ${response._id}.`);
      
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})


router.patch("/update_order/:user_id",(req,res)=>{
    const data=req.body
    Order.findOne({_id:data.order_id})
    .then((response) => {

      response.coupon_code=data.coupon_code
      response.discount=data.discount
      response.save()
      .then((order) => {
              console.log("saved")
              res.status(200).json(order)
       }).catch((err) => {
        console.error(err);
    });

    }).catch((err) => {
        console.error(err);
    });
})

router.get("/order_by_id/:order_id",(req, res) => {
// console.log(req.params.order_id)
  Order.findOne({_id:req.params.order_id})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

router.get("/order_details/:order_id",(req, res) => {
  const id=req.params.order_id
  console.log(id)
  Order.findOne({_id:id})   
   .then((response) => {
      console.log(response);
      const item_id=response.item_id
      Item.findOne({_id:item_id})
      .then((item)=>{
          const data={
            item_name:item.name,
            bill:response.bill,
            order_id:response._id,
            order_date:response.ordered_at,
            quantity:response.quantity,
            status:response.status,
            discount:response.discount,
            coupon_code:response.coupon_code
          }
          // console.log(data)
          res.status(200).json(data)
      })
      
    }).catch((err) => {
        console.error(err);
    });
})


router.get('/orders_by_customer/:user_id',(req,res)=>{
  Order.find({customer_id:req.params.user_id})
     .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})


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


/* Return */
router.post("/return_item/:user_id",(req,res)=>{
    const data=req.body // order_id,item_id,customer_id
    console.log(data)
    Return.create(data)
    .then((response) => {
      console.log(response);
      //update Order
      Order.findOne({_id:req.body.order_id})
      .then((order)=>{
        order.status="returned"
        order.save()
        console.log("updated order")
      }).catch((err)=>{
          console.log(err)
        })
    }).catch((err) => {
        console.error(err);
    });
})


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

router.get('/returns_by_customer/:user_id',(req,res)=>{
  Return.find({customer_id:req.params.user_id})
     .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

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
    if(data.status=="accepted"){
      Item.findOne({_id:updated.item_id})
      .then((item)=>{
        item.returned_quantity+=1
        item.save()
        .then((response)=>{
          console.log("items updated")
          Order.findOne({_id:updated.order_id})
          .then((order)=>{
            Seller.findOne({_id:item.seller_id})
            .then((seller)=>{
              seller.amount-=order.bill
              seller.save();
            })
          })

            res.status(200).json(updated);
        })
      })
    }
    })
    .catch((err) => {
    res.status(404).json({ message: "Return not found" });
    });  
})


router.get("/get_return_status/:return_id",(req,res)=>{
    const id=req.params.return_id;
    Return.findOne(
    { _id: id },
    )
    .then((response) => {
    res.status(200).json(response);
    })
    .catch((err) => {
    res.status(404).json({ message: "Return not found" });
    });  
})

/* Bank */
router.post("/post_bank",(req,res)=>{
  const data=req.body;
    Bank.create(
    data
    )
    .then((response) => {
    res.status(200).json(response);
    })
    .catch((err) => {
    res.status(404).json({ message: "Error creating account" });
    }); 
})

/* Account */
router.post("/post_account", (req, res) => {
  console.log(req.body);
  const data=req.body
  Bank.findOne({ name: req.body.bank_name })
    .then((bank) => {
      if (bank) {
        //Bank already exists, update accounts in it
        console.log(bank)
        Account.create(data).then((account)=>{
          console.log(`account created ${account._id}`)
          bank.accounts.push(account._id);
          bank.save();
          console.log("bank updated")
          // update customer account
          Customer.findOne({phone:data.phone})
          .then((customer)=>{
            customer.bank_accounts.push(account);
            customer.save();
            console.log("customer updated")
            res.status(200).json(account);
          })
        })
      } else {
        //  Bank doesn't exists,create one and add account
        Bank.create(data)
          .then((bank) => {
            console.log(`bank with id ${bank._id} has been created.`);
            res.status(200).json(bank);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});



router.post('/payments', (req, res) => {
    const data = req.body;
    console.log("payments  started")
    Customer.findOne({ _id: data.customer_id })
        .then((customer) => {
          console.log(customer)
            const account = customer.bank_accounts.find((acc) => {
                return acc.account_number === data.account_number && acc.bank === data.bank;
            });
            
            if (account) {
              if(data.discount){
                const amount=parseFloat(data.amount)-parseFloat(data.amount)*(parseFloat(data.discount)/100)
                console.log(amount)
              }
                const amount=data.amount
                if (account.balance >= amount) {
                    account.balance -= amount;
                    customer.save()
                        .then(() => {
                          console.log(data.item_id)
                            Item.findOne({_id:data.item_id})
                            .then((item)=>{
                              item.sold_quantity+=data.quantity
                              Seller.findOne({_id:item.seller_id}).then((seller)=>{
                                if(seller.amount){
                                      seller.amount=(parseFloat(amount))+parseFloat( seller.amount)
                                }
                                else{
                                  seller.amount=parseFloat(amount)
                                }
                                seller.save();
                              })
                              item.save()
                              .then((saved)=>{
                                console.log("saved");
                                console.log(saved)
                                res.status(200).send('Payment successful and items updated');
                              })
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).send('Error saving to database');
                        });
                        //  res.status(200).send('Payment successful and items updated');
                } else {
                    res.status(400).send('Insufficient funds');
                }
            } else {
                res.status(404).send('Account not found');
            }
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

router.get("/get_coupons",(req,res)=>{
    Coupon.find()
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