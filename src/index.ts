import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import imageRoutes from './routing/satelliteImagesRoutes';
import orderRoutes from './routing/ordersRoutes';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies for POST orders and for Get filtered images

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Register API routes
app.use('/api', imageRoutes);
app.use('/api', orderRoutes);


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});


