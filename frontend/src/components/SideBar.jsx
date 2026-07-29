function SideBar( { activePage, setActivePage } ) {
    return (
        <aside className="sidebar">
            <h3>Navigation</h3>
            <ul>
                <li
                    className={activePage === "dashboard" ? "active" : ""}
                    onClick={() => setActivePage("dashboard")}
                >
                    🏠 Dashboard
                </li>

                <li
                    className={activePage === "tasks" ? "active" : ""}
                    onClick={() => setActivePage("tasks")}
                >
                    📋 Tasks
                </li>

                <li
                    className={activePage === "settings" ? "active" : ""}
                    onClick={() => setActivePage("settings")}
                >
                    ⚙️ Settings
                </li>
            </ul>
        </aside>
    )
}

export default SideBar