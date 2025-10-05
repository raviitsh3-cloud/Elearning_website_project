require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// -------- Middlewares --------
app.use(cors());
app.use(express.json());

// -------- Serve frontend --------
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// -------- Routes --------
app.use("/api/auth", require("./routes/auth"));

// -------- Connect to MongoDB Atlas --------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });