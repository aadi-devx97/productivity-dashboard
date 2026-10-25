import type { Task } from "../types/task"

type StatsSectionProps = {
    tasks: Task[]
}

import StatsCard from "./StatsCard"

function StatsSection({ tasks } : StatsSectionProps) {
    const totalTasks = tasks.length

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length
    return (
        <section className="stats-section">
            <StatsCard title="Total tasks" value={totalTasks} icon="☷" tone="neutral" />
            <StatsCard title="Completed" value={completedTasks} icon="✓" tone="success" />
            <StatsCard title="To focus on" value={pendingTasks} icon="→" tone="accent" />
        </section>
    )
}

export default StatsSection
