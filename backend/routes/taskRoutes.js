const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    resetTasks
} = require("../controllers/taskController")

router.get("/tasks", authMiddleware, getTasks);
router.post("/tasks", authMiddleware, createTask);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/reset", authMiddleware, resetTasks);
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router