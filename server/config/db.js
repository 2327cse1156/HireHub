// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use your full connection string, including database name if needed
    const uri = process.env.MONGODB_URI.includes('Hire_Hub')
      ? process.env.MONGODB_URI
      : `${process.env.MONGODB_URI}/Hire_Hub`;

    await mongoose.connect(uri);

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
