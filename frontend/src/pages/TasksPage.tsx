import TaskSection from "../components/TaskSection";
import DashboardControls from "../components/DashboardControls";
import DashboardFilters from "../components/DashboardFilters";
import type { Dispatch, SetStateAction } from "react"
import type { Task } from "../types/task"

type TasksPageProps = {
    filteredTasks: Task[]
    toggleTask: (id: string) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    editTask: (taskId: string, newTitle: string) => Promise<void>

    taskTitle: string
    setTaskTitle: Dispatch<SetStateAction<string>>
    addTask: () => Promise<void>

    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>

    filter: string
    setFilter: Dispatch<SetStateAction<string>>

    darkMode: boolean
    setDarkMode: Dispatch<SetStateAction<boolean>>
}

function TasksPage({ 
    filteredTasks, toggleTask, deleteTask,
    taskTitle, setTaskTitle, addTask,
    searchTerm, setSearchTerm,
    filter, setFilter,
    editTask, 
    darkMode, setDarkMode
}: TasksPageProps) {
    return (
        <div>
            <h2>📋 Tasks Page</h2>
            <DashboardControls
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                addTask={addTask}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <DashboardFilters 
                filter={filter}
                setFilter={setFilter}
            />
            <TaskSection
                filteredTasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        </div>
    );
}

export default TasksPage;