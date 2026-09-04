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

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={() => onDrop(status)}
    >
      <h2>{title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          onDelete={() => onDelete(task.id)}
          onEdit={(updatedTask) =>
            onEdit(task.id, updatedTask)
          }
          onDragStart={() => onDragStart(task.id)}
        />
      ))}
    </div>
  );
}

export default Column;