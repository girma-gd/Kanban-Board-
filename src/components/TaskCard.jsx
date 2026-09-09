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
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(title);

  const [editedDescription, setEditedDescription] =
    useState(description);

  const [editedPriority, setEditedPriority] = useState(
    priority || "medium"
  );

  const [editedLabels, setEditedLabels] = useState(
    labels ? labels.join(", ") : ""
  );

  const [editedDueDate, setEditedDueDate] = useState(
    dueDate || ""
  );

  // Check whether the task is overdue
  const isOverdue =
    dueDate &&
    new Date(`${dueDate}T23:59:59`) < new Date();

  // Save edited task
  function handleSave() {
    if (editedTitle.trim() === "") {
      return;
    }

    const updatedLabels = editedLabels
      .split(",")
      .map((label) => label.trim())
      .filter((label) => label !== "");

    onEdit({
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      priority: editedPriority,
      labels: updatedLabels,
      dueDate: editedDueDate,
    });

    setIsEditing(false);
  }

  // Cancel editing
  function handleCancel() {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedPriority(priority || "medium");
    setEditedLabels(
      labels ? labels.join(", ") : ""
    );
    setEditedDueDate(dueDate || "");

    setIsEditing(false);
  }

  // --------------------------------
  // EDIT MODE
  // --------------------------------

  if (isEditing) {
    return (
      <div className="task-card">
        <input
          type="text"
          placeholder="Task title"
          value={editedTitle}
          onChange={(event) =>
            setEditedTitle(event.target.value)
          }
        />

        <textarea
          placeholder="Task description"
          value={editedDescription}
          onChange={(event) =>
            setEditedDescription(event.target.value)
          }
        />

        <select
          value={editedPriority}
          onChange={(event) =>
            setEditedPriority(event.target.value)
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
          placeholder="Labels (e.g. Frontend, Bug, Urgent)"
          value={editedLabels}
          onChange={(event) =>
            setEditedLabels(event.target.value)
          }
        />

        <label className="form-label">
          Due Date

          <input
            type="date"
            value={editedDueDate}
            onChange={(event) =>
              setEditedDueDate(event.target.value)
            }
          />
        </label>

        <div className="task-actions">
          <button
            className="edit-button"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------
  // NORMAL MODE
  // --------------------------------

  return (
    <div
      className={`task-card ${
        isOverdue ? "task-overdue" : ""
      }`}
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
      {labels && labels.length > 0 && (
        <div className="task-labels">
          {labels.map((label, index) => (
            <span
              className="task-label"
              key={index}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Due Date */}
      {dueDate && (
        <div
          className={`task-due-date ${
            isOverdue ? "overdue" : ""
          }`}
        >
          📅{" "}
          {isOverdue
            ? "Overdue"
            : "Due"}{" "}
          {new Date(
            `${dueDate}T00:00:00`
          ).toLocaleDateString()}
        </div>
      )}

      {/* Actions */}
      <div className="task-actions">
        <button
          className="edit-button"
          onClick={() =>
            setIsEditing(true)
          }
        >
          Edit
        </button>

        <button
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