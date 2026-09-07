function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="task-filters">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
      >
        <option value="all">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(event) =>
          setPriorityFilter(event.target.value)
        }
      >
        <option value="all">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>

      {(search ||
        statusFilter !== "all" ||
        priorityFilter !== "all") && (
        <button
          type="button"
          className="clear-filters"
          onClick={() => {
            setSearch("");
            setStatusFilter("all");
            setPriorityFilter("all");
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default TaskFilters;