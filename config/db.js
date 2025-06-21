const mongoose = require("mongoose");  // Import Mongoose
const dotenv = require("dotenv");      // Import dotenv to load environment variables

dotenv.config();  // Load environment variables from .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log(" MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);  
  }
};

module.exports = connectDB;