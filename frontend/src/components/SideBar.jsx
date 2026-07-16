function SideBar( { activePage, setActivePage } ) {
    return (
        <aside className="sidebar">
            <h3>Navigation</h3>
            <ul>
                <li onClick={() => setActivePage("dashboard")}>
                    🏠 Dashboard
                </li>
                <li onClick={() => setActivePage("tasks")}>
                    ✅ Tasks
                </li>
                <li onClick={() => setActivePage("settings")}>
                    ⚙️ Settings
                </li>
            </ul>
        </aside>
    )
}

export default SideBar