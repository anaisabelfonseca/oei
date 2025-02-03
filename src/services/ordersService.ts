import db from '../db/db';
import type { Order } from "../models/Order";

// Post an order
export const postOrder = async (catalogId: string, customerName: string): Promise<Order> => {
    const query = `
    INSERT INTO orders (order_id, catalog_id, customer_name)
    VALUES (gen_random_uuid(), $1, $2)
    RETURNING *;
  `;

  const values = [catalogId, customerName];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Order insertion failed: " + error);
  }
  };
  
  // Get orders (with optional pagination)
  export const getAllOrders = async (limit: number = 10): Promise<Order[]> => {
    const query = `
      SELECT * FROM orders
      ORDER BY order_date DESC
      LIMIT $1 OFFSET $2;
    `;
    const values = [limit];
  
    const result = await db.query(query, values);
    return result.rows;
  };
  