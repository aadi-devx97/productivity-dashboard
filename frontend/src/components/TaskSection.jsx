import TaskList from "./TaskList"

function TaskSection({
    filteredTasks,
    toggleTask,
    deleteTask,
    editTask
}) {
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