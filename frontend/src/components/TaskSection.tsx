import TaskList from "./TaskList"
import type { Task } from "../types/task"

type TaskSectionProps = {
    filteredTasks: Task[]
    toggleTask: (id: string) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    editTask: (taskId: string, newTitle: string) => Promise<void>
}

function TaskSection({ filteredTasks, toggleTask, deleteTask, editTask }: TaskSectionProps) {
    return (
        <>
        <p>Showing {filteredTasks.length} task(s)</p>

        {
            filteredTasks.length === 0 && (
                <p>No tasks found.</p>
            )
        }

        <TaskList
            tasks={filteredTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
        />
        </>
    );
}

export default TaskSection;