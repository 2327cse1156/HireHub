import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API');
});
await connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});