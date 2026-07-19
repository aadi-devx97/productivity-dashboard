function DashboardControls({ 
    darkMode,
    setDarkMode,
    taskTitle,
    setTaskTitle,
    addTask,
    searchTerm,
    setSearchTerm }) {
    return (
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
    );
}

export default DashboardControls;