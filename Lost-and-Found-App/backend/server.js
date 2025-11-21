
require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const server = http.createServer(app);

// Update CORS to allow your deployed frontend
const io = new Server(server, {
  cors: {
    origin: "https://full-mern-stack-project-1.onrender.com", // deployed frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "https://full-mern-stack-project-1.onrender.com", // allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🎉" });
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Make io accessible everywhere
app.set("io", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
