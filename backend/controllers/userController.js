import express from 'express';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/UserModel.js';



//@Desc       Auth user & get token
//@Rout       POST   /api/users/login
//@access     Public
export const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        return res.json({
            _id: user.id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password.');
    }   
});




//@Desc       register user and give token
//@Rout       POST   /api/users
//@access     Public
export const registerUser = asyncHandler(async (req,res)=>{
    const {name , email, password} = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error('email already registered.')
    }else{
        const user = await User.create({
            email,
            name,
            password
        });

        if(user){
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token: generateToken(user._id)
            });
        }
        
    }   
});



//@Desc       get current user's profile
//@Rout       GET   /api/users/profile
//@access     Private
export const getProfile =asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id).select('-password');
    if(user){
        res.json({
            name:user.name,
            email:user.email,
            _id:user._id,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(404);
        throw new Error('User Not Found!');
    }
})