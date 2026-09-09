import TaskCard from "./TaskCard";

function Column({
  title,
  tasks,
  status,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
}) {
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleTaskDrop(event, targetTaskId) {
    event.preventDefault();
    event.stopPropagation();

    onDrop(status, targetTaskId);
  }

  function handleColumnDrop(event) {
    event.preventDefault();

    onDrop(status);
  }

  return (
    <div
      className={`column column-${status}`}
      onDragOver={handleDragOver}
      onDrop={handleColumnDrop}
    >
      <div className="column-header">
        <div>
          <h2>{title}</h2>
          <p>
            {tasks.length === 1 ? "1 task" : `${tasks.length} tasks`}
          </p>
        </div>

        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <span>✓</span>
            <p>No tasks here</p>
            <small>Drag a task here</small>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              labels={task.labels}
              onDelete={() => onDelete(task.id)}
              onEdit={(updatedTask) => onEdit(task.id, updatedTask)}
              onDragStart={() => onDragStart(task.id)}
              onDrop={(event) => handleTaskDrop(event, task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;