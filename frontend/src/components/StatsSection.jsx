import StatsCard from "./StatsCard"

function StatsSection({ tasks }) {
    const totalTasks = tasks.length

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length
    return (
        <section className="stats-section">
            <StatsCard title="Total Tasks" value={totalTasks} />
            <StatsCard title="Completed" value={completedTasks} />
            <StatsCard title="Pending" value={pendingTasks} />
        </section>
    )
}

export default StatsSection