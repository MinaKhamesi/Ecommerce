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


//@Desc       delete a product
//@Rout       DELETE /api/products/:id
//@access     private/admin
export const deleteProduct = asyncHandler( async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        product.remove();
        res.json({message:'product removed!'});
    }else{
        res.status(404);
        throw new Error('Product Not Found');
    }
    
})

//@Desc       create a new product
//@Rout       POST /api/products/
//@access     private/admin
export const createProduct = asyncHandler( async (req,res)=>{
    const newProduct = await Product.create({
        user:req.user._id,
        name:'sample product',
        image:"./images/sample.jpg",
        brand:'sample brand',
        category:'sample category',
        description:'sample description',
        price:0
    });

    res.status(201).json(newProduct);
    
})

//@Desc       edit a  product
//@Rout       PUT  /api/products/:id
//@access     private/admin
export const editProduct = asyncHandler( async (req,res)=>{

    const product = await Product.findById(req.params.id);

    if(product){

        product.name=req.body.name 
        product.image=req.body.image 
        product.brand=req.body.brand 
        product.category=req.body.category 
        product.description=req.body.description 
        product.price=req.body.price 
        product.countInStock=req.body.countInStock 

        const editedProduct = await product.save();
        res.json(editedProduct);
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    } 
})