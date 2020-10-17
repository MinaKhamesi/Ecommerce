import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';



//@Desc       fetch all products
//@Rout       /api/products
//@access     Public
export const getProducts = asyncHandler(async (req,res)=>{
    
    const products = await  Product.find({});
    
    res.json(products);
});


//@Desc       fetch a single product by id
//@Rout       /api/products/:id
//@access     Public
export const getProductById = asyncHandler( async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Product Not Found');
    }
    
})