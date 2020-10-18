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


//@Desc       get an order by id
//@Rout       GET   /api/orders/:id
//@access     Private
export const getOrderById = asyncHandler(async (req,res)=>{
    
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        res.status(404);
        throw new Error('Order Not Found!');
    }

    res.json(order)

});

//@Desc       update order to paid
//@Rout       PUT   /api/orders/:id/pay
//@access     Private
export const updateOrderToPaid = asyncHandler(async (req,res)=>{
    
    const order = await Order.findById(req.params.id);

    if(!order){
        res.status(404);
        throw new Error('Order Not Found!');
    }

    order.paid = true;
    order.paidAt = Date.now();
    order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.email_address
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);

});
