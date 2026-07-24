import DashboardControls from "../components/DashboardControls";
import DashboardFilters from "../components/DashboardFilters";
import WelcomeCard from "../components/WelcomeCard";
import TaskSection from "../components/TaskSection";
import MissionSection from "../components/MissionSection";
import StatsSection from "../components/StatsSection";
import CalendarCard from "../components/CalendarCard";
import SettingsCard from "../components/SettingsCard";  

function DashboardHome({
    pendingTasksCount,
    user,
    tasks,
    darkMode, setDarkMode,
    taskTitle, setTaskTitle,
    addTask,
    searchTerm, setSearchTerm,
    filter,
    setFilter, filteredTasks,
    toggleTask, deleteTask
}) {
    return (
        <>
        <WelcomeCard
            pendingTasksCount={pendingTasksCount}
            user={user}
        />

        <div className="dashboard-grid">
            <CalendarCard />
            <SettingsCard />
        </div>

        <div className="dashboard-grid">
            <MissionSection tasks={tasks} />
            <StatsSection tasks={tasks} />
        </div>

        <DashboardControls
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            addTask={addTask}
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
        />
        </>
    );
}

export default DashboardHome;