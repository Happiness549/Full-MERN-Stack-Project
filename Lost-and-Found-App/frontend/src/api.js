
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Backend running 🎉" });
});

// Your routes
const itemsRoute = require("./routes/items");
app.use("/api/items", itemsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default api;