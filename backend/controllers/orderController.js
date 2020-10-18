import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';



//@Desc       create an order
//@Rout       POST   /api/orders
//@access     Private
export const createOrder = asyncHandler(async (req,res)=>{
    const {orderItems,
         price, 
         shippingPrice, 
         taxPrice,
          totalPrice, 
          shippingAddress, 
          paymentMethod } = req.body;


    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error('No Order Item');
        return;
    }

    

    const order = await  new Order({
        user:req.user._id,
        orderItems, 
        price, 
        shippingPrice, 
        taxPrice, 
        totalPrice, 
        shippingAddress, 
        paymentMethod })

   const createdOrder =  await order.save();
    res.status(201).json(createdOrder)
});
