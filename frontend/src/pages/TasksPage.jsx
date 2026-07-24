import TaskSection from "../components/TaskSection";
import DashboardControls from "../components/DashboardControls";
import DashboardFilters from "../components/DashboardFilters";

function TasksPage({ 
    filteredTasks, toggleTask, deleteTask,
    taskTitle, setTaskTitle, addTask,
    searchTerm, setSearchTerm,
    filter, setFilter
}) {
    return (
        <div>
            <h2>📋 Tasks Page</h2>
            <DashboardControls
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                addTask={addTask}
            />
            <DashboardFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
            />
            <TaskSection
                filteredTasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
            />
        </div>
    );
}

export default TasksPage;