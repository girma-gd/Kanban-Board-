function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
}) {
  const hasFilters =
    search ||
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    sortBy !== "newest";

  function handleClear() {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortBy("newest");
  }

  return (
    <div className="task-filters">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <select
        value={statusFilter}
        onChange={(event) =>
          setStatusFilter(
            event.target.value
          )
        }
      >
        <option value="all">
          All Statuses
        </option>

        <option value="todo">
          Todo
        </option>

        <option value="in-progress">
          In Progress
        </option>

        <option value="done">
          Done
        </option>
      </select>

      <select
        value={priorityFilter}
        onChange={(event) =>
          setPriorityFilter(
            event.target.value
          )
        }
      >
        <option value="all">
          All Priorities
        </option>

        <option value="high">
          High Priority
        </option>

        <option value="medium">
          Medium Priority
        </option>

        <option value="low">
          Low Priority
        </option>
      </select>

      <select
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value)
        }
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="priority-high">
          Priority: High → Low
        </option>

        <option value="priority-low">
          Priority: Low → High
        </option>

        <option value="due-earliest">
          Due Date: Earliest
        </option>

        <option value="due-latest">
          Due Date: Latest
        </option>
      </select>

      {hasFilters && (
        <button
          type="button"
          className="clear-filters"
          onClick={handleClear}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default TaskFilters;