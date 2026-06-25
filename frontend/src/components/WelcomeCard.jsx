function WelcomeCard({ pendingTasksCount }) {
    const hour = new Date().getHours()

    let greeting = ""

    if (hour < 12) {
        greeting = "Good Morning ☀️"
    } else if (hour < 18) {
        greeting = "Good Afternoon 🌤️"
    } else {
        greeting = "Good Evening 🌙"
    }
    return (
        <section className="card">
            <h2>{greeting}</h2>
            <p>You have {pendingTasksCount} pending missions(s) today.</p>
        </section>
    )
}

export default WelcomeCard