import mongoose from "mongoose";
const connectDB = async () => {
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
  
    mongoose.connection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err);
    });
  
    await mongoose.connect(process.env.MONGODB_URI);
  };
  
  export default connectDB;
  