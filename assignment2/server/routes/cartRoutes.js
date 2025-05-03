import express from 'express';
import CartController from '../controller/cartController.js';

const router = express.Router();

router.post('/add', CartController.addToCart);
router.put('/remove', CartController.removeFromCart);
router.get('/:accountId', CartController.getCartByAccountId);

export default router;
