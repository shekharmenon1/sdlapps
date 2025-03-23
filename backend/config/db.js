// config/db.js
const mongoose = require("mongoose");

// Set strictQuery explicitly to suppress the warning
//mongoose.set('strictQuery', true);
//test

const MONGO_URI = 'mongodb+srv://Shekhar:Password@volunteermanagement.pryig.mongodb.net/?retryWrites=true&w=majority&appName=VolunteerManagement';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // Remove deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;