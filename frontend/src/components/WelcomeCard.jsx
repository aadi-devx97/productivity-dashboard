function WelcomeCard({ pendingTasksCount, user }) {
    const hour = new Date().getHours()

    let greeting

    if (hour < 12) {
        greeting = "Good Morning ☀️"
    } else if (hour < 18) {
        greeting = "Good Afternoon 🌤️"
    } else {
        greeting = "Good Evening 🌙"
    }
    return (
        <section className="card dashboard-card dashboard-welcome-card">
            <div>
                <p className="dashboard-eyebrow">Your workspace</p>
                <h1>{greeting}, {user?.name || "there"}.</h1>
                <p className="dashboard-welcome-copy">
                    {pendingTasksCount === 0
                        ? "Everything is clear. Enjoy the calm or plan your next task."
                        : `You have ${pendingTasksCount} ${pendingTasksCount === 1 ? "task" : "tasks"} ready for your attention.`}
                </p>
            </div>
            <div className="dashboard-welcome-count" aria-label={`${pendingTasksCount} pending tasks`}>
                <strong>{pendingTasksCount}</strong>
                <span>pending</span>
            </div>
        </section>
    )
}

export default WelcomeCard
