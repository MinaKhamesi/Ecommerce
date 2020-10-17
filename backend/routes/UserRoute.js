import express from 'express';
import {protect} from '../middleware/auth.js';
import {authUser,registerUser , getProfile, updateProfile} from '../controllers/userController.js';


const router = express.Router();

router.route('/').post(registerUser);

router.route('/login').post(authUser);

router.route('/profile').get(protect,getProfile).put(protect, updateProfile);


export default router;