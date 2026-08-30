import Column from "./Column";

function Board({
  todoTasks,
  inProgressTasks,
  doneTasks,
  onDelete,
  onEdit,
  onMove,
}) {
  return (
    <div className="board">
      <Column
        title="Todo"
        tasks={todoTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onMove={onMove}
      />

      <Column
        title="In Progress"
        tasks={inProgressTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onMove={onMove}
      />

      <Column
        title="Done"
        tasks={doneTasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onMove={onMove}
      />
    </div>
  );
}

export default Board;