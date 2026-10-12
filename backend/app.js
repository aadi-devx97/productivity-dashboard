const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

module.exports = app;