import { Request, Response, NextFunction, RequestHandler } from 'express';
import { postOrder, getAllOrders } from '../services/ordersService';

// Post order
export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const { catalogId, customerName } = req.body;

      if (!catalogId || !customerName) {
          res.status(400).json({ message: "Missing required fields: catalogId and customerName" });
          return; // Important: Stops execution here
      }

      const order = await postOrder(catalogId, customerName);
      
      res.status(201).json(order); // Ensure response is sent properly
  } catch (error) {
      next(error); // Express will handle the error
  }
};

// Get orders list
export const listOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For pagination
    const limit = parseInt(req.query.limit as string) || 10;

    const orders = await getAllOrders(limit);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};