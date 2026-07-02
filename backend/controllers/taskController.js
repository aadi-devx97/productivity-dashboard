const Task = require("../models/Task")

async function getTasks(req, res) {
  try {
    const tasks = await Task.find()

    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to fetch tasks",
    })
  }
}

function createTask(req, res) {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

function updateTask(req, res) {
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
}

function deleteTask(req, res) {
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
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}