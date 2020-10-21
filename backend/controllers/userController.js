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

//@Desc       update user's profile
//@Rout       Put   /api/users/profile
//@access     Private
export const updateProfile =asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.json({
            name:updatedUser.name,
            email:updatedUser.email,
            _id:updatedUser._id,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(404);
        throw new Error('User Not Found!');
    }
})


//@Desc       get all users
//@Rout       GET   /api/users/
//@access     Private/Admin
export const getUsers =asyncHandler(async (req,res) =>{
    
    const users = await User.find({});
   
        res.json(users)
})

//@Desc       delete a uset
//@Rout       DELETE   /api/users/:id
//@access     Private/Admin
export const deleteUserById =asyncHandler(async (req,res) =>{
    
    const user = await User.findById(req.params.id);

   if(user){
        await user.remove()
        res.json({message:' User Removed!'});
   }else{
       res.status(404)
       throw new Error('User Not Found!')
   }
})