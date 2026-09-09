function TaskDetailsModal({ task, onClose }) {
  if (!task) {
    return null;
  }

  const isOverdue =
    task.dueDate &&
    task.status !== "done" &&
    new Date(`${task.dueDate}T23:59:59`) < new Date();

  function formatDate(date) {
    if (!date) {
      return "Not set";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString();
  }

  function formatCompletedDate(date) {
    if (!date) {
      return "Not completed";
    }

    return new Date(date).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function getStatusLabel(status) {
    if (status === "in-progress") {
      return "In Progress";
    }

    if (status === "todo") {
      return "Todo";
    }

    if (status === "done") {
      return "Done";
    }

    return status;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="task-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">
              TASK DETAILS
            </p>

            <h2>{task.title}</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Description */}
        <div className="modal-section">
          <span className="modal-label">
            Description
          </span>

          <p className="modal-description">
            {task.description ||
              "No description provided."}
          </p>
        </div>

        {/* Task Information */}
        <div className="modal-details">
          <div className="detail-item">
            <span className="modal-label">
              Status
            </span>

            <strong>
              {getStatusLabel(task.status)}
            </strong>
          </div>

          <div className="detail-item">
            <span className="modal-label">
              Priority
            </span>

            <span
              className={`priority priority-${
                task.priority || "medium"
              }`}
            >
              {task.priority || "medium"}
            </span>
          </div>

          <div className="detail-item">
            <span className="modal-label">
              Due Date
            </span>

            <strong
              className={
                isOverdue
                  ? "modal-overdue"
                  : ""
              }
            >
              {task.dueDate
                ? formatDate(task.dueDate)
                : "Not set"}

              {isOverdue && " — Overdue"}
            </strong>
          </div>

          <div className="detail-item">
            <span className="modal-label">
              Completed
            </span>

            <strong>
              {formatCompletedDate(
                task.completedAt
              )}
            </strong>
          </div>
        </div>

        {/* Labels */}
        <div className="modal-section">
          <span className="modal-label">
            Labels
          </span>

          {task.labels &&
          task.labels.length > 0 ? (
            <div className="task-labels">
              {task.labels.map(
                (label, index) => (
                  <span
                    className="task-label"
                    key={index}
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="no-labels">
              No labels
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="modal-close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;