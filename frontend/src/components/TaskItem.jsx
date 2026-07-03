function TaskItem({ task, toggleTask, deleteTask }) {
    return (
        <div className="task-item">

            <li onClick={() => toggleTask(task._id)} className="task-title">
                {task.completed ? "✅" : "⬜"} {task.title}
            </li>
            <button onClick={() => deleteTask(task._id)} className="delete-btn">
                Delete
            </button>
        </div>
    )
}

export default TaskItem