import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"

function SettingsCard() {
  const { darkMode } =
    useContext(ThemeContext)

  return (
    <div className="card">
      <h2>⚙️ Settings</h2>

      <p>
        Theme:
        {darkMode
          ? " Dark Mode"
          : " Light Mode"}
      </p>

      <p>
        Storage:
        LocalStorage Enabled
      </p>

      <p>
        Tasks Saved:
        {localStorage.getItem("tasks")
          ? " Yes"
          : " No"}
      </p>
    </div>
  )
}

export default SettingsCard