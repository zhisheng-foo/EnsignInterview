import express from 'express';
import ProductController from '../controller/productController.js';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

export default router;
