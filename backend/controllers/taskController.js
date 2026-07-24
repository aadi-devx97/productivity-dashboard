const Task = require("../models/Task")

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({
      user: req.user.userId
    })

    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to fetch tasks",
    })
  }
}

async function createTask(req, res) {
  try {
    const { title } = req.body

    const task = await Task.create({
      title,
      user: req.user.userId,
    })

    res.status(201).json(task)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to create task",
    })
  }
}

async function updateTask(req, res) {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      req.body,
      { new: true }
    )

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    res.json(task)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to update task",
    })
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    })

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    res.json({
      message: "Task deleted successfully",
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to delete task",
    })
  }
}

async function resetTasks(req, res) {
  try {
    const userId = req.user.userId

    await Task.deleteMany({ user: userId })

    res.json({
      message: "All tasks reset successfully",
    })
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to reset tasks",
    });
  }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    resetTasks
}