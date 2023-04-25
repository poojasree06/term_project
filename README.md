# E-Commerce Website


## Introduction 

This is an e-commerce platform that enables sellers to register and list their products for customers to search, add to cart, and purchase.
The platform also includes a dummy bank system, an advertisement interface, 
item delivery tracking, and a return workflow. The project is built using the MERN stack, which consists of MongoDB, Express.js, React, and Node.js.

## Functionality
**Seller Registration**<br>
Sellers can register on the platform by providing their details such as name, contact information, and bank account details.

**Add, Modify or Delete Items**<br>
Sellers can add, modify, or delete their products from the platform. They can also modify the quantity of the items as purchase happens.

**Seller Inventory**<br>
Each seller has an inventory of different types of items of different quantities that change dynamically as purchase happens.

**Seller Dashboard**<br>
The seller dashboard indicates items sold, items returned, and tracks each item.

**Customer Registration**<br>
Customers can register on the platform by providing their details such as name, contact information, and bank account details.

**Customer Search for Items**<br>
Customers can search for products on the platform based on the item name, category, or seller name.

**Add Items to Cart**<br>
Customers can add items to their cart while browsing through the platform.

**Modify Cart**<br>
Customers can modify the items in their cart before proceeding to checkout.

**Item Delivery Tracking**<br>
Customers can track the delivery status of their items from the warehouse to their location.

**Multiple Warehouses**<br>
The platform have multiple warehouses that can be added, modified or deleted.

**Random Warehouse Selection**<br>
For each selected item, the system randomly chooses the warehouse path.

**Item Arrives at Warehouse**<br>
The system updates the delivery status of the item when it arrives at the warehouse.

**Item Dispatches from Warehouse**<br>
The system updates the delivery status of the item when it dispatches from the warehouse.

**Returned Item Arrives at Seller**<br>
The returned item arrives at the seller's location.

**Customer Tracking**<br>
Customers can track the status of their returned item.

**Credit for Return**<br>
If the seller accepts the return, the amount is credited back to the customer's account.

**Rejection of Return**<br>
If the seller rejects the return, the customer can file a grievance in the platform, and the system attaches specific details and history automatically.

**Advertisement Interface**<br>
The system provides an advertisement interface where advertisers can register.

**Discount Coupons**<br>
Advertisers can add, modify, or delete discount coupons.

OTP Code:
Upon final arrival, the customer needs to enter an OTP code in the web interface to receive the item.

Payment Interface:
A dummy interface is provided for customers to pay for their items.

Dummy Bank System:
A dummy bank system is provided where customers have their accounts and can modify the balance when making payments or receiving refunds.

Exception Handling:
The system handles exceptions when the customer's account balance is less than the amount required to make a purchase.

Multiple Bank Accounts:
Customers can have accounts in multiple banks.

Bank Selection Interface:
Customers can select which bank account to use when making payments.
