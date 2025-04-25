import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();
const PORT = process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

// Connect to database
await connectDB();

// Middleware (Apply raw ONLY for webhook route)
app.use("/webhooks", express.raw({ type: "application/json" }));

// Now apply global middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal Server!");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My First Sentry error!");
});

// Clerk webhook route
app.post("/webhooks", clerkWebhooks);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
