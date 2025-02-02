import express from 'express';
import { createOrder, listOrders } from '../controllers/ordersController';

const router = express.Router();

router.get('/orders', listOrders);
router.post('/orders', createOrder);

export default router;