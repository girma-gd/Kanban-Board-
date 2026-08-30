import TaskCard from "./TaskCard";
function Column({
  title,
  tasks,
  onDelete,
  onEdit,
  onMove,
}) {
  return (
    <div className="column">
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
          onMove={(newStatus) =>
            onMove(task.id, newStatus)
          }
        />
      ))}
    </div>
  );
}

export default Column;