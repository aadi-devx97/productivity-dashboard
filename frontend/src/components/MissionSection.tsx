import type { Task } from "../types/task"

type MissionSectionProps = {
  tasks: Task[]
  setActivePage: (page: string) => void
}

function MissionSection({ tasks, setActivePage }: MissionSectionProps) {
  const completedTasks = tasks.filter(
    (task) => task.completed
  )

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  )

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
        (completedTasks.length / tasks.length) * 100
      )

  return (
    <section className="card dashboard-card mission-card">
      <div className="dashboard-card-heading">
        <div>
          <p className="dashboard-eyebrow">Today</p>
          <h2>Mission progress</h2>
        </div>
        <span className="mission-progress-value">{progress}%</span>
      </div>

      <div className="mission-progress-track" aria-label={`${progress}% of tasks completed`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="mission-summary" aria-label="Task progress summary">
        <span><strong>{completedTasks.length}</strong> completed</span>
        <span><strong>{pendingTasks.length}</strong> remaining</span>
      </div>

      {pendingTasks.length === 0 ? (
        <div className="dashboard-empty-state">
          <span aria-hidden="true">✦</span>
          <div>
            <h3>{tasks.length === 0 ? "Start your day with one small task" : "You are all caught up"}</h3>
            <p>{tasks.length === 0 ? "Add a mission and it will appear here." : "Every task is marked complete."}</p>
          </div>
          <button className="dashboard-text-button" onClick={() => setActivePage("tasks")}>
            {tasks.length === 0 ? "Add a task" : "View tasks"}
          </button>
        </div>
      ) : (
        <div className="mission-list">
          {pendingTasks.map((task) => (
            <div className="mission-list-item" key={task._id}>
              <span className="mission-item-marker" aria-hidden="true" />
              <span>{task.title}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MissionSection
