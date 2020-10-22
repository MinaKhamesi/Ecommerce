import express from 'express';

import {getProducts, getProductById, deleteProduct, createProduct, editProduct} from '../controllers/productController.js';

import {protect, isAdmin} from '../middleware/auth.js';

const router = express.Router();


router.route('/').get(getProducts).post(protect,isAdmin,createProduct);

router.route('/:id').get(getProductById).delete(protect,isAdmin,deleteProduct).put(protect,isAdmin,editProduct);

export default router;