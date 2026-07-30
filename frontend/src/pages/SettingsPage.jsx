import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom"
import "../styles/settings.css"


function SettingsPage({ user, fetchTasks }) {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    async function handleResetTasks() {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${BASE_URL}/tasks/reset`, 
            { 
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            await fetchTasks(); // Refresh tasks after reset
        }
    }
    return (
        <div className="settings-page">
        <h2>Settings</h2>

        <section className="settings-card">
            <h3>⚙️ Settings Page</h3>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
        </section>

        <section className="settings-card">
            <h3>🎨 Theme</h3>
            <p>
                Current Theme: {darkMode ? "Dark" : "Light"}
            </p>
            <button onClick={() => setDarkMode(!darkMode)}>
                Toggle Theme
            </button>
        </section>

        <section className="settings-card">
            <h3>🧹 Reset Tasks</h3>
            <button onClick={handleResetTasks}>
                Reset All Tasks
            </button>
        </section>

        <section className="settings-card">
            <h3>🚪 Logout</h3>
            <button onClick={handleLogout}>
                Logout
            </button>
        </section>

        <section className="settings-card">
            <h3>🚀 About</h3>
            <p>Productivity Dashboard V2</p>
            <p>Version 2.0.0</p>
            <p>React • Express • MongoDB</p>
            <p>Built by Aadi Jain</p>
        </section>
        </div>
    );
}

export default SettingsPage;