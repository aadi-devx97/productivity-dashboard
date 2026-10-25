import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"

function SettingsCard() {
  const { darkMode } =
    useContext(ThemeContext)

  return (
    <section className="card dashboard-card dashboard-utility-card settings-card">
      <p className="dashboard-eyebrow">Preferences</p>
      <h2>Workspace settings</h2>
      <dl className="settings-summary">
        <div>
          <dt>Theme</dt>
          <dd>{darkMode ? "Dark mode" : "Light mode"}</dd>
        </div>
        <div>
          <dt>Storage</dt>
          <dd>{localStorage.getItem("tasks") ? "Tasks saved" : "Ready to save tasks"}</dd>
        </div>
      </dl>
    </section>
  )
}

export default SettingsCard
