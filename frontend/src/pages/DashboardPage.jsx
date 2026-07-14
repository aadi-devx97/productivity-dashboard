import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
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
import BASE_URL from "../config/api"
import "../styles/dashboard.css"


function DashboardPage() {
    const [tasks, setTasks] = useState([])

    const [taskTitle, setTaskTitle] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all")
    const [user, setUser] = useState(null)
    const { darkMode, setDarkMode } = useContext(ThemeContext)
    const navigate = useNavigate()

    useEffect(() => {
      async function fetchTasks() {
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
          return
        }

        const data = await response.json()
        setTasks(data)

        const userResponse = await fetch(`${BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const userData = await userResponse.json()
        setUser(userData)
        console.log(userData)
      }

      fetchTasks()
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

      const token = localStorage.getItem("token")

      const response = await fetch(
        `${BASE_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title:taskTitle
          }),
        }
      )

      if (response.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      const newTask = await response.json()

      setTasks([...tasks, newTask])
      setTaskTitle("")
    }

    async function toggleTask(id) {
      const task = tasks.find((task) => task._id === id)
      const token = localStorage.getItem("token")

      const response = await fetch(
        `${BASE_URL}/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      )

      if (response.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      const updatedTask = await response.json()
      const updatedTasks = tasks.map((task) => {
        if (task._id === id) {
          return updatedTask
        }

        return task
      })
      setTasks(updatedTasks)
    }

    async function deleteTask(id) {
      const token = localStorage.getItem("token")
      await fetch(
        `${BASE_URL}/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      const updatedTasks = tasks.filter(
        (task) => task._id !== id
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
                        user={user}
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