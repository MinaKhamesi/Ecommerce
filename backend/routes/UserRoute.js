import express from 'express';
import {isAdmin, protect} from '../middleware/auth.js';
import {authUser,registerUser , getProfile, updateProfile, getUsers} from '../controllers/userController.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

router.route('/login').post(authUser);

router.route('/profile').get(protect,getProfile).put(protect, updateProfile);


export default router;