import { useState } from "react";

function TaskCard({
  title,
  description,
  priority,
  labels,
  dueDate,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
  onViewTask,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [editedTitle, setEditedTitle] =
    useState(title);

  const [editedDescription, setEditedDescription] =
    useState(description);

  const [editedPriority, setEditedPriority] =
    useState(priority || "medium");

  const [editedLabels, setEditedLabels] =
    useState(
      labels
        ? labels.join(", ")
        : ""
    );

  function handleSave() {
    if (editedTitle.trim() === "") {
      return;
    }

    const updatedLabels =
      editedLabels
        .split(",")
        .map((label) =>
          label.trim()
        )
        .filter(
          (label) => label !== ""
        );

    onEdit({
      title: editedTitle.trim(),
      description:
        editedDescription.trim(),
      priority: editedPriority,
      labels: updatedLabels,
    });

    setIsEditing(false);
  }

  function handleViewDetails(event) {
    event.stopPropagation();

    onViewTask();
  }

  if (isEditing) {
    return (
      <div className="task-card">
        <input
          type="text"
          value={editedTitle}
          onChange={(event) =>
            setEditedTitle(
              event.target.value
            )
          }
        />

        <textarea
          value={editedDescription}
          onChange={(event) =>
            setEditedDescription(
              event.target.value
            )
          }
        />

        <select
          value={editedPriority}
          onChange={(event) =>
            setEditedPriority(
              event.target.value
            )
          }
        >
          <option value="low">
            Low Priority
          </option>

          <option value="medium">
            Medium Priority
          </option>

          <option value="high">
            High Priority
          </option>
        </select>

        <input
          type="text"
          placeholder="Labels"
          value={editedLabels}
          onChange={(event) =>
            setEditedLabels(
              event.target.value
            )
          }
        />

        <div className="task-actions">
          <button
            className="edit-button"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            type="button"
            onClick={() =>
              setIsEditing(false)
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const isOverdue =
    dueDate &&
    new Date(`${dueDate}T23:59:59`) <
      new Date();

  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
      onDragOver={(event) =>
        event.preventDefault()
      }
      onDrop={onDrop}
    >
      {/* Priority */}
      <div
        className={`priority priority-${
          priority || "medium"
        }`}
      >
        {priority || "medium"} priority
      </div>

      {/* Title */}
      <h3>{title}</h3>

      {/* Description */}
      <p>{description}</p>

      {/* Labels */}
      {labels &&
        labels.length > 0 && (
          <div className="task-labels">
            {labels.map(
              (label, index) => (
                <span
                  className="task-label"
                  key={`${label}-${index}`}
                >
                  {label}
                </span>
              )
            )}
          </div>
        )}

      {/* Due Date */}
      {dueDate && (
        <div
          className={`task-due-date ${
            isOverdue
              ? "overdue"
              : ""
          }`}
        >
          📅 Due{" "}
          {new Date(
            `${dueDate}T00:00:00`
          ).toLocaleDateString()}
        </div>
      )}

      {/* Actions */}
      <div className="task-actions">
        <button
          type="button"
          className="view-button"
          onClick={handleViewDetails}
        >
          View Details
        </button>

        <button
          type="button"
          className="edit-button"
          onClick={() =>
            setIsEditing(true)
          }
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;