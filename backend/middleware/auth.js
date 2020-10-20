import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';


export const protect = asyncHandler(async (req,res,next) =>{
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = await jwt.verify(token,process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');
            
            req.user = user;
            
            next()

        } catch (error) {
            res.status(401);
            throw new Error(' Not Authorized, token failed')
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token ')
    }


 
})

export const isAdmin = asyncHandler(async (req,res,next) =>{
    
    if (req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
})

