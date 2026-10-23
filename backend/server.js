
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO setup
const io = new Server(server, {
  cors: {
   origin: [
  "http://localhost:5173",
  "https://sneaker-hub-brown.vercel.app"
],
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("SneakerHub API is Running");
});

// Existing Experiment 5: Product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Experiment 6: Authentication routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Experiment 6: Protected user and admin routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Experiment 8: Real-time chat events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("WebSocket server is ready");
});
