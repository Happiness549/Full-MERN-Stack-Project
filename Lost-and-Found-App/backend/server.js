
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🎉" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
