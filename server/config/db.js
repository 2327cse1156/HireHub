import mongoose from 'mongoose';


const connectDB = async () => {
    mongoose.connection.on("connected",()=> console.log("Database connected succesfully"));
    await mongoose.connect(`${process.env.MONGODB_URI}/Hire_Hub`);
};

export default connectDB;