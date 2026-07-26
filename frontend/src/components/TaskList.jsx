import TaskItem from "./TaskItem"

function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                    editTask={editTask}
                />
            ))}
        </ul>
    )
}

export default TaskList