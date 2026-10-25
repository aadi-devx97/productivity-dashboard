import type { Task } from "../types/task"

type FocusTasksProps = {
    tasks: Task[]
    setActivePage: (page: string) => void
}

function FocusTasks({ tasks, setActivePage }: FocusTasksProps) {

    const pendingTasks = tasks.filter(task => !task.completed);

    const focusTasks = pendingTasks.slice(0, 3);

    return (
        <section className="card dashboard-card focus-card">
            <div className="dashboard-card-heading">
                <div>
                    <p className="dashboard-eyebrow">Next up</p>
                    <h2>Today's focus</h2>
                </div>
                <span className="focus-count">{focusTasks.length}</span>
            </div>

            {focusTasks.length === 0 ? (
                <p className="focus-empty">Nothing competing for your attention right now.</p>
            ) : (
                <>
                <ul className="focus-list">
                    {focusTasks.map(task => (
                        <li key={task._id}>
                            <span aria-hidden="true">→</span>
                            {task.title}
                        </li>
                    ))}
                </ul>
                <button
                    className="view-all-btn"
                    onClick={() => setActivePage("tasks")}
                >
                    View all tasks →
                </button>
                </>
            )}
            
        </section>
    );
}

export default FocusTasks;
