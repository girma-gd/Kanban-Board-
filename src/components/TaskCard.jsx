function TaskCard({ title, description }) {
  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default TaskCard;