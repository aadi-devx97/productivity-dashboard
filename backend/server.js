const express = require("express");
const cors = require("cors")
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors())
app.use(express.json());
app.use(taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});