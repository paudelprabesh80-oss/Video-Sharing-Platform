
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/users.models.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    const email = "naruto222@gmail.com"; 
    const newPassword = "123456";   

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      process.exit();
    }

    user.password = newPassword;
    await user.save();

    console.log("Password reset successfully");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

run();