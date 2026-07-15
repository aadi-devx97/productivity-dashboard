function SideBar( { activePage, setActivePage } ) {
    return (
        <aside className="sidebar">
            <h3>Navigation</h3>
            <ul>
                <li>🏠 Dashboard</li>
                <li>✅ Tasks</li>
                <li>⚙️ Settings</li>
            </ul>
        </aside>
    )
}

export default SideBar