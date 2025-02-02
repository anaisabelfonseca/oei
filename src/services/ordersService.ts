import db from '../db/db';
import type { Order } from "../models/Order";

// Post an order
export const postOrder = async (catalogId: string, customerName: string): Promise<Order> => {
    const query = `INSERT INTO orders (catalog_id, customer_name) VALUES ($1, $2)`;
    const values = [catalogId, customerName];
  
    const result = await db.query(query, values);
    return result.rows[0];
  };
  
  // ✅ Get all orders (with optional pagination)
  export const getAllOrders = async (limit: number = 10, offset: number = 0): Promise<Order[]> => {
    const query = `
      SELECT * FROM orders
      ORDER BY order_date DESC
      LIMIT $1 OFFSET $2;
    `;
    const values = [limit, offset];
  
    const result = await db.query(query, values);
    return result.rows;
  };
  