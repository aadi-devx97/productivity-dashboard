import WelcomeCard from "../components/WelcomeCard";
import MissionSection from "../components/MissionSection";
import StatsSection from "../components/StatsSection";
import CalendarCard from "../components/CalendarCard";
import SettingsCard from "../components/SettingsCard";  
import FocusTasks from "../components/FocusTasks";

function DashboardHome({
    pendingTasksCount,
    user,
    tasks,
    setActivePage
}) {
    return (
        <div className="dashboard-home">
            <WelcomeCard
                pendingTasksCount={pendingTasksCount}
                user={user}
            />

            <StatsSection tasks={tasks} />

            <div className="dashboard-workspace">
                <MissionSection
                    tasks={tasks}
                    setActivePage={setActivePage}
                />

                <aside className="dashboard-rail" aria-label="Daily overview">
                    <FocusTasks
                        tasks={tasks}
                        setActivePage={setActivePage}
                    />

                    <div className="dashboard-utility-grid">
                        <CalendarCard />
                        <SettingsCard />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default DashboardHome;
