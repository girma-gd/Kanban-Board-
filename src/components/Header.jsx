function Header({ total, todo, inProgress, done }) {
  return (
    <header className="header">
      <div className="header-top">
        <div>
          <p className="eyebrow">PROJECT MANAGEMENT</p>
          <h1>Kanban Board</h1>
          <p className="header-description">
            Organize your work, track progress, and get things done.
          </p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <strong>{total}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Todo</span>
          <strong>{todo}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <strong>{inProgress}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <strong>{done}</strong>
        </div>
      </div>
    </header>
  );
}

export default Header;