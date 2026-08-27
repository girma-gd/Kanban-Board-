function TaskCard({ title, description, onDelete }) {
  return (
    <div className="task-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <button
        className="delete-button"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;