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

async function createTask(req, res) {
  try {
    const { title } = req.body

    const task = await Task.create({
      title,
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
    const task = await Task.findByIdAndUpdate(
      req.params.id,
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
    const task = await Task.findByIdAndDelete(req.params.id)

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

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}