import { useState } from "react"

function TaskItem({ task, toggleTask, deleteTask, editTask }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.title)

    return (
        <div className="task-item">
            {
                isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                ) : (
                    <li
                        onClick={() => toggleTask(task._id)}
                        className="task-title"
                    >
                        {task.completed ? "🟩" : "⬜"} {task.title}
                    </li>
                )
            }

            {
                isEditing ? (
                    <>
                        <button onClick={() => {
                            editTask(task._id, editText)
                            setIsEditing(false)
                        }}
                        >
                            Save
                        </button>

                        <button className="cancel-btn" onClick={() => {
                            setEditText(task.title)
                            setIsEditing(false)
                        }}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="edit-btn"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteTask(task._id)}
                            className="delete-btn"
                        >
                            Delete
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default TaskItem