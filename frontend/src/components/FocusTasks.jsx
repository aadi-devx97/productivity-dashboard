function FocusTasks({ tasks, setActivePage }) {

    const pendingTasks = tasks.filter(task => !task.completed);

    const focusTasks = pendingTasks.slice(0, 3);

    return (
        <div className="card">
            
            <h2 className="focus-title">🎯 Today's Focus</h2>

            {focusTasks.length === 0 ? (
                <p>🎉 You're all caught up!</p>
            ) : (
                <>
                <ul className="focus-list">
                    {focusTasks.map(task => (
                        <li key={task._id || task.id}>
                            {task.title}
                        </li>
                    ))}
                </ul>
                <button
                    className="view-all-btn"
                    onClick={() => setActivePage("tasks")}
                >
                    View all tasks →
                </button>
                </>
            )}
            
        </div>
    );
}

export default FocusTasks;
