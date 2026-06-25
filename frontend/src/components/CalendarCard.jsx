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
    <div className="card">
      <h2>📅 Calendar</h2>

      <h3>{day}</h3>

      <p>{date}</p>
    </div>
  )
}

export default CalendarCard