function StatsCard({ title, value, icon, tone }) {
    return (
        <div className={`stats-card stats-card--${tone}`}>
            <div>
                <p className="stats-card-label">{title}</p>
                <strong>{value}</strong>
            </div>
            <span className="stats-card-icon" aria-hidden="true">{icon}</span>
        </div>
    )
}

export default StatsCard
