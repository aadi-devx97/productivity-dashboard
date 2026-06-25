function MissionSection({ tasks }) {
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
    <div className="card">
      <h2>🎯 Today's Missions</h2>
      <p>
        completed: {completedTasks.length}
      </p>

      <p>
        pending: {pendingTasks.length}
      </p>

      <p>
        Progress: {progress}%
      </p>

      {pendingTasks.map((task) => (
        <p key={task.id}>
          {task.completed ? "✅" : "⬜"} {task.title}
        </p>
      ))}
    </div>
  )
}

export default MissionSection