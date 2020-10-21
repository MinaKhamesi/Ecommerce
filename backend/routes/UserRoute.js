import express from 'express';
import {isAdmin, protect} from '../middleware/auth.js';
import {authUser,registerUser , getProfile, updateProfile, getUsers, deleteUserById, getUserById, editUser} from '../controllers/userController.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

router.route('/:id').get(protect, isAdmin, getUserById).put(protect, isAdmin, editUser).delete(protect, isAdmin, deleteUserById);

router.route('/login').post(authUser);

router.route('/profile').get(protect,getProfile).put(protect, updateProfile);


export default router;