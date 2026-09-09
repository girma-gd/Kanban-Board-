import Column from "./Column";

function Board({
  todoTasks,
  inProgressTasks,
  doneTasks,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
  onViewTask,
}) {
  return (
    <div className="board">
      <Column
        title="Todo"
        status="todo"
        tasks={todoTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onViewTask={onViewTask}
      />

      <Column
        title="In Progress"
        status="in-progress"
        tasks={inProgressTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onViewTask={onViewTask}
      />

      <Column
        title="Done"
        status="done"
        tasks={doneTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onViewTask={onViewTask}
      />
    </div>
  );
}

export default Board;