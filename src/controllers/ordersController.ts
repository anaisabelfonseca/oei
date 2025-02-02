import { Request, Response, NextFunction, RequestHandler } from 'express';
import { postOrder, getAllOrders } from '../services/ordersService';

// Post order
export const createOrder: RequestHandler = async (req, res, next) => {
    try {
        const order = await postOrder(req.params.catalogId, req.params.customerName);
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

// Get orders list
export const listOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For pagination
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const orders = await getAllOrders(limit, offset);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};