import express from 'express';
import {protect} from '../middleware/auth.js';
import { createOrder, getOrderById} from '../controllers/orderController.js';


const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrderById);




export default router;