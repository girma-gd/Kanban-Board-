import Column from "./Column";

function Board({
  todoTasks,
  inProgressTasks,
  doneTasks,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
}) {
  return (
    <div className="board">
      {/* Todo Column */}
      <Column
        title="Todo"
        status="todo"
        tasks={todoTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onDragStart={onDragStart}
        onDrop={onDrop}
      />

      {/* In Progress Column */}
      <Column
        title="In Progress"
        status="in-progress"
        tasks={inProgressTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onDragStart={onDragStart}
        onDrop={onDrop}
      />

      {/* Done Column */}
      <Column
        title="Done"
        status="done"
        tasks={doneTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onDragStart={onDragStart}
        onDrop={onDrop}
      />
    </div>
  );
}

export default Board;