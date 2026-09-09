function Header({
  total,
  todo,
  inProgress,
  done,
  progress,
  recentlyCompleted,
}) {
  function formatCompletedDate(date) {
    return new Date(
      date
    ).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <header className="header">
      {/* Header */}
      <div className="header-top">
        <div>
          <p className="eyebrow">
            PROJECT MANAGEMENT
          </p>

          <h1>Kanban Board</h1>

          <p className="header-description">
            Organize your work, track progress,
            and get things done.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-card">
          <span className="stat-label">
            Total Tasks
          </span>

          <strong>{total}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Todo
          </span>

          <strong>{todo}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            In Progress
          </span>

          <strong>{inProgress}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Completed
          </span>

          <strong>{done}</strong>
        </div>
      </div>

      {/* Project Progress */}
      <div className="progress-card">
        <div className="progress-header">
          <div>
            <span className="progress-label">
              Project Progress
            </span>

            <p>
              {done} of {total} tasks completed
            </p>
          </div>

          <strong className="progress-percentage">
            {progress}%
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Recently Completed */}
      {recentlyCompleted.length > 0 && (
        <div className="recent-card">
          <div className="recent-header">
            <div>
              <span className="progress-label">
                Recently Completed
              </span>

              <p>
                Your latest finished tasks
              </p>
            </div>
          </div>

          <div className="recent-list">
            {recentlyCompleted.map(
              (task) => (
                <div
                  className="recent-task"
                  key={task.id}
                >
                  <div className="recent-check">
                    ✓
                  </div>

                  <div className="recent-task-info">
                    <strong>
                      {task.title}
                    </strong>

                    <span>
                      Completed{" "}
                      {formatCompletedDate(
                        task.completedAt
                      )}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;