// api/server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// -------- Middlewares --------
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

// -------- Routes --------
app.use("/api/auth", require("../routes/auth"));

// -------- MongoDB Connection (only once) --------
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
  }
};

// -------- Handler (VERY IMPORTANT for Vercel) --------
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};