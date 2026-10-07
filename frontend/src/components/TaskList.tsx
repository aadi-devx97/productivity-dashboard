import TaskItem from "./TaskItem"
import type { Task } from "../types/task"

type TaskListProps = {
    tasks: Task[]
    toggleTask: (id: string) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    editTask: (taskId: string, newTitle: string) => Promise<void>
}

function TaskList({ tasks, toggleTask, deleteTask, editTask }: TaskListProps) {
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