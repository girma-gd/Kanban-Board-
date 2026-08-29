import { useState } from "react";

function TaskCard({
  title,
  description,
  status,
  onDelete,
  onEdit,
  onMove,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  function handleSave() {
    if (editedTitle.trim() === "") {
      return;
    }

    onEdit({
      title: editedTitle,
      description: editedDescription,
    });

    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="task-card">
        <input
          type="text"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
        />

        <textarea
          value={editedDescription}
          onChange={(event) =>
            setEditedDescription(event.target.value)
          }
        />

        <div className="task-actions">
          <button onClick={handleSave}>
            Save
          </button>

          <button onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <div className="task-actions">
        <button
          className="edit-button"
          onClick={() => setIsEditing(true)}
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

      <div className="move-actions">
        {status !== "todo" && (
          <button onClick={() => onMove("todo")}>
            ← Todo
          </button>
        )}

        {status !== "in-progress" && (
          <button onClick={() => onMove("in-progress")}>
            → In Progress
          </button>
        )}

        {status !== "done" && (
          <button onClick={() => onMove("done")}>
            → Done
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;