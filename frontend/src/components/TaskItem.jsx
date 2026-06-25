function TaskItem({ task, toggleTask, deleteTask }) {
    return (
        <div className="task-item">

            <li onClick={() => toggleTask(task.id)} className="task-title">
                {task.completed ? "✅" : "⬜"} {task.title}
            </li>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
                Delete
            </button>
        </div>
    )
}

export default TaskItem