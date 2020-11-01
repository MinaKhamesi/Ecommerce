import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';



//@Desc       fetch all products
//@Rout       /api/products
//@access     Public
export const getProducts = asyncHandler(async (req,res)=>{
    const pageSize = 2;
     
    const page = Number(req.query.pageNumber) || 1

    const search = req.query.keyword ? {name:{
        $regex : req.query.keyword,
        $options : 'i'
    }} : {}


    const count = await Product.countDocuments(search);

    const products = await  Product.find(search).limit(pageSize).skip(pageSize*(page-1));
    
    res.json({products, page,pages : Math.ceil(count/pageSize)});
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

//@Desc       get top products
//@Rout       GET   /api/products/top
//@access     Public
export const getTopProducts = asyncHandler( async (req,res)=>{
    const product = await Product.find({}).sort({rating:-1}).limit(3);
    res.json(product);
    
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

//@Desc       create a review
//@Rout       POST  /api/products/:id/reviews
//@access     private/
export const createReview = asyncHandler( async (req,res)=>{
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);

    if(product){

        const alreadyReviewd = product.reviews.find(r =>r.user.toString()===req.user._id.toString())

        if(alreadyReviewd){
            res.status(400);
            throw new Error('User already reviewed the product.')
        }
        const newReview = {
            user:req.user._id,
            name:req.user.name,
            comment,
            rating:Number(rating)
        }

        product.reviews.push(newReview)

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc,r)=>acc+r.rating,0)/product.reviews.length;

         await product.save();

         res.status(201).json({message:'Review added.'})

    }else{
        res.status(404)
        throw new Error('Product Not Found')
    } 
})