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
import TasksPage from "./TasksPage"
import SettingsPage from "./SettingsPage"
import DashboardHome from "./DashboardHome"
import DashboardControls from "../components/DashboardControls"
import DashboardFilters from "../components/DashboardFilters"
import TaskSection from "../components/TaskSection"
import "../styles/dashboard.css"


function DashboardPage() {
    const [tasks, setTasks] = useState([])

    const [taskTitle, setTaskTitle] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all")
    const [user, setUser] = useState(null)
    const [activePage, setActivePage] = useState("dashboard")
    const { darkMode, setDarkMode } = useContext(ThemeContext)
    const navigate = useNavigate()

    
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

    useEffect(() => {
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
      const response = await fetch(
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
                <Sidebar activePage={activePage} setActivePage={setActivePage} />
                <p>Current Page: {activePage}</p>

                <main className="dashboard-content">
                  {activePage === "dashboard" && (
                    <>
                      <DashboardHome
                        pendingTasksCount={pendingTasksCount}
                        user={user}
                        tasks={tasks}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        taskTitle={taskTitle}
                        setTaskTitle={setTaskTitle}
                        addTask={addTask}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filter={filter}
                        setFilter={setFilter}
                        filteredTasks={filteredTasks}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                      />
                    </>
                  )}

                  {activePage === "tasks" &&(
                    <TasksPage
                      filteredTasks={filteredTasks}
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      filter={filter}
                      setFilter={setFilter}
                      taskTitle={taskTitle}
                      setTaskTitle={setTaskTitle}
                      addTask={addTask}
                    />
                  )}

                  {activePage === "settings" && (
                    <SettingsPage
                      user={user}
                      fetchTasks={fetchTasks}
                    />
                  )}
                </main>
            </div>
        </div>
    )
}

export default DashboardPage