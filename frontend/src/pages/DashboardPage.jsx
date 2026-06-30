import { useState, useEffect, useContext } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import WelcomeCard from "../components/WelcomeCard"
import StatsCard from "../components/StatsCard"
import StatsSection from "../components/StatsSection"
import TaskList from "../components/TaskList"
import ThemeContext from "../context/ThemeContext"
import CalendarCard from "../components/CalendarCard"
import MissionSection from "../components/MissionSection"
import SettingsCard from "../components/SettingsCard"
import "../styles/dashboard.css"


function DashboardPage() {
    const [tasks, setTasks] = useState([])

    const [taskTitle, setTaskTitle] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all")
    const { darkMode, setDarkMode } = useContext(ThemeContext)

    useEffect(() => {
      fetch("http://localhost:5000/tasks")
        .then((response) => response.json())
        .then((data) => {
          setTasks(data)
        })
    }, [])

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(
            searchTerm.toLowerCase()
          )

        if (filter === "completed") {
          return matchesSearch && task.completed
        }

        if (filter === "pending") {
          return matchesSearch && !task.completed
        }

        return matchesSearch
    })

    const pendingTasksCount =
      tasks.filter(
        (task) => !task.completed
      ).length

    async function addTask() {
      if (taskTitle.trim() === "") {
        return
      }

      const response = await fetch(
        "http://localhost:5000/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title:taskTitle
          }),
        }
      )

      const newTask = await response.json()

      setTasks([...tasks, newTask])
      setTaskTitle("")
    }

    async function toggleTask(id) {
      const task = tasks.find((task) => task.id === id)

      const response = await fetch(
        `http://localhost:5000/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      )

      const updatedTask = await response.json()
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return updatedTask
        }

        return task
      })
      setTasks(updatedTasks)
    }

    async function deleteTask(id) {
      await fetch(
        `http://localhost:5000/tasks/${id}`,
        {
          method: "DELETE",
        }
      )

      const updatedTasks = tasks.filter(
        (task) => task.id !== id
      )
      setTasks(updatedTasks)
    }
    
    return (
        <div
          className={
            darkMode
              ? "dashboard dark"
              : "dashboard"
          }
        >
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <main className="dashboard-content">
                    <WelcomeCard
                        pendingTasksCount={pendingTasksCount}
                    />

                    <div className="dashboard-grid">
                      <CalendarCard />
                      <SettingsCard />
                    </div>

                    <div className="dashboard-grid">
                      <MissionSection tasks={tasks} />
                      <StatsSection tasks={tasks} />
                    </div>

                    <div className="controls">

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                        </button>

                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Enter task"
                        />
                        <button onClick={addTask}>
                            Add Task
                        </button>

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filters">
                        <button onClick={() => setFilter("all")}>{filter === "all" ? "👉 All" : "All"}</button>

                        <button onClick={() => setFilter("completed")}
                        >
                            {filter === "completed" ? "👉 Completed" : "Completed"}
                        </button>

                        <button onClick={() => setFilter("pending")}
                        >
                            {filter === "pending" ? "👉 Pending" : "Pending"}
                        </button>
                    </div>

                    <p>Showing {filteredTasks.length} task(s)</p>

                    {
                        filteredTasks.length === 0 && (
                            <p>No tasks found.</p>
                        )
                    }

                    <TaskList
                        tasks={filteredTasks}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                    />
                </main>
            </div>
        </div>
    )
}

export default DashboardPage