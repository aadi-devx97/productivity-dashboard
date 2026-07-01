const express = require("express");
const cors = require("cors")
const tasks = require("./data/tasks");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors())
app.use(express.json());
app.use(taskRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});