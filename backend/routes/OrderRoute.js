import express from 'express';
import {isAdmin, protect} from '../middleware/auth.js';
import { createOrder, deliverOrder, getMyOrders, getOrderById, getOrders, updateOrderToPaid} from '../controllers/orderController.js';


const router = express.Router();

router.route('/').post(protect, createOrder).get(protect,isAdmin,getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect,isAdmin,deliverOrder);




export default router;