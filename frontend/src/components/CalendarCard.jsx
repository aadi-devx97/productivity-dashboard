function CalendarCard() {
  const today = new Date()

  const day = today.toLocaleDateString(
    "en-US",
    { weekday: "long" }
  )

  const date = today.toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  )

  return (
    <section className="card dashboard-card dashboard-utility-card calendar-card">
      <p className="dashboard-eyebrow">Calendar</p>
      <h2>{day}</h2>
      <p>{date}</p>
    </section>
  )
}

export default CalendarCard
