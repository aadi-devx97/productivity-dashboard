const express = require("express");
const cors = require("cors")
const tasks = require("./data/tasks");

const app = express();
app.use(cors())

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ye post route hai
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

//ye edit vala
app.put("/tasks/:id", (req, res) => {
  const taskId =  Number(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if(!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.title = req.body.title ?? task.title;

  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  res.json(task);
})

// delete vala
app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
  });
});