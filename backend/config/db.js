const mongoose = require("mongoose");

const MONGO_URI = 'mongodb+srv://Shekhar:Password@volunteermanagement.pryig.mongodb.net/?retryWrites=true&w=majority&appName=VolunteerManagement';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;