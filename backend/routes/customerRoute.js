const express = require('express');
const mongoose = require('mongoose');
const {Seller,Customer,Item,Account,Cart,Order,Warehouse,WarehouseItem,Return,Complaint, Advertiser,Bank,Coupon} =require('../models/projectSchema.js')
const router = express.Router();

// post new customer to db
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

//login - verify the customer in the db
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


router.get("/all_items",(req, res) => {
  Item.find({})   
   .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
    });
})

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

router.get("/order_by_id/:order_id",(req, res) => {
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
            status:response.status
          }
          console.log(data)
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

router.get('/returns_by_customer/:user_id',(req,res)=>{
  Return.find({customer_id:req.params.user_id})
     .then((response) => {
      console.log(response);
      res.status(200).json(response)
    }).catch((err) => {
        console.error(err);
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
    console.log("payments")
    Customer.findOne({ _id: data.customer_id })
        .then((customer) => {
          console.log(customer.bank_accounts)
            const account = customer.bank_accounts.find((acc) => {
                return acc.account_number === data.account_number && acc.bank === data.bank;
            });
            if (account) {
                if (account.balance >= data.amount) {
                    account.balance -= data.amount;
                    customer.save()
                        .then(() => {
                            res.status(200).send('Payment successful');
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).send('Error saving to database');
                        });
                } else {
                    res.status(400).send('Insufficient funds');
                }
            } else {
                res.status(404).send('Account not found');
            }
        });
});


module.exports=router