const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new mongoose.Schema({
  name: {type: String, required: true },
  accounts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
});

const AccountSchema = new Schema({
  account_number: {type: String,required: true},
  phone: { type: String, required:true},
  account_holder: { type: String, required: true },
  balance: { type: Number, default: 0 },
  bank_name:{ type: String, required:true},
  createdOn: { type: Date, default: Date.now },

});

const ReturnSchema=new Schema({
    customer_id:{ type: mongoose.Types.ObjectId, required: true},
    order_id:{ type: mongoose.Types.ObjectId, required: true},
    item_id:{ type: mongoose.Types.ObjectId, required: true},
    returned_at:{type:Date,default:Date.now},
    quantity:{type:Number,default:1},
    status:{type:String,required:true,default:"pending"} 
});

const OrderSchema=new Schema({
    customer_id:{ type: mongoose.Types.ObjectId, required: true},
    item_id:{ type: mongoose.Types.ObjectId, required: true},
    quantity:{type:Number,default:1},
    bill:{type:String,required:true},
    ordered_at:{type:Date,default:Date.now},
    otp:{type:String},
    status:{type:String,required:true,default:"ordered"} ,
    coupon_code:{type:String},
    discount:{type:String}
})

const CustomerSchema=new Schema({
    name:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    bank_accounts: [AccountSchema],
    registered_at:{type:Date,default:Date.now},
})



const SellerSchema=new Schema({
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    registered_at:{type:Date,default:Date.now},
    amount:{type:String}
})

const ItemSchema=new Schema({
    name:{type:String,required:true},
    desc:{type:String},
    price:{type:String,required:true},
    seller_id:{type:mongoose.Types.ObjectId,required:true},
    added_at:{type:Date,default:Date.now},
    quantity_added:{type:Number,default:1,required:true},
    sold_quantity:{type:Number,default:0},
    returned_quantity:{type:Number,default:0},

})


const CartSchema=new Schema({
    customer_id:{ type: mongoose.Types.ObjectId, required: true},
    item_id:{ type: mongoose.Types.ObjectId, required: true},
    quantity:{type:Number,default:1},
    price:{type:String,required:true},
    added_at:{type:Date,default:Date.now},
})

const WarehouseItemSchema=new Schema({
    order_id:{ type: mongoose.Types.ObjectId, required: true},
    item_id:{ type: mongoose.Types.ObjectId, required: true},
    warehouse:{ type: mongoose.Types.ObjectId,ref:'Warehouse'},
    isReturned:{type:Boolean,default:false},
    arrived_at:{type:Date,default:Date.now},
})

const WarehouseSchema=new Schema({
    name:{ type: String, required: true }
})


const ComplaintSchema=new Schema({
    order_id:{ type: mongoose.Types.ObjectId, required: true},
    filed_at:{type:Date,default:Date.now},
})


const CouponSchema=new Schema({
    name:{type:String,required:true},
    advertiser_id:{ type: mongoose.Types.ObjectId, required: true},
    added_at:{type:Date,default:Date.now},
    discount:{type:String,required:true},
    // description:{type:String,required:true},
    valid_date:{type:String,required:true}
})

const AdvertiserSchema=new Schema({
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    registered_at:{type:Date,default:Date.now},
    coupons:{CouponSchema}
})




const Seller=mongoose.model('Seller',SellerSchema);
const Customer=mongoose.model('Customer',CustomerSchema);
const Item=mongoose.model('Item',ItemSchema);
const Account=mongoose.model('Account',AccountSchema);
const Cart=mongoose.model('Cart',CartSchema);
const Order=mongoose.model('Order',OrderSchema);
const Warehouse=mongoose.model('Warehouse',WarehouseSchema);
const WarehouseItem=mongoose.model('WarehouseItem',WarehouseItemSchema);
const Return=mongoose.model('Return',ReturnSchema);
const Complaint=mongoose.model('Complaint',ComplaintSchema);
const Advertiser=mongoose.model('Advertiser',AdvertiserSchema);
const Coupon=mongoose.model('Coupon',CouponSchema);
const Bank = mongoose.model('Bank', bankSchema);
module.exports={Seller,Customer,Item,Account,Order,Warehouse,WarehouseItem,Return,Complaint,Advertiser,Coupon,Cart,Bank}