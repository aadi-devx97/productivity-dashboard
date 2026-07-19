function DashboardFilters({ filter, setFilter }) {
    return (
        <div className="filters">
            <button onClick={() => setFilter("all")}>
                {filter === "all" ? "👉 All" : "All"}
            </button>

            <button onClick={() => setFilter("completed")}>
                {filter === "completed" ? "👉 Completed" : "Completed"}
            </button>

            <button onClick={() => setFilter("pending")}>
                {filter === "pending" ? "👉 Pending" : "Pending"}
            </button>
        </div>
    );
}

export default DashboardFilters;