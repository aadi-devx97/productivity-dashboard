import DashboardControls from "../components/DashboardControls";
import DashboardFilters from "../components/DashboardFilters";
import WelcomeCard from "../components/WelcomeCard";
import TaskSection from "../components/TaskSection";
import MissionSection from "../components/MissionSection";
import StatsSection from "../components/StatsSection";
import CalendarCard from "../components/CalendarCard";
import SettingsCard from "../components/SettingsCard";  
import FocusTasks from "../components/FocusTasks";

function DashboardHome({
    pendingTasksCount,
    user,
    tasks,
    darkMode, setDarkMode,
    setActivePage
}) {
    return (
        <>
        <WelcomeCard
            pendingTasksCount={pendingTasksCount}
            user={user}
        />

        <StatsSection tasks={tasks} />

        <div className="dashboard-main-grid">
            <MissionSection tasks={tasks} />
            <FocusTasks tasks={tasks} setActivePage={setActivePage} />
        </div>

        <div className="dashboard-grid">
            <CalendarCard />
            <SettingsCard />
        </div>    
        </>
    );
}

export default DashboardHome;