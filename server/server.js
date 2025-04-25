import "./config/instrument.js"
import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import * as Sentry from "@sentry/node"
import connectDB from './config/db.js';
import { clerkWebhooks } from "./controllers/webhooks.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

await connectDB();
// Middleware
app.use(cors());
app.use(json());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API');
});
app.get("/debug-sentry",function mainHandler(req,res){
  throw new Error("My first Sentry error!");
})
app.post("/webhooks",clerkWebhooks)



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});