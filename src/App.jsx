import { useState } from "react";
import "./App.css";

import AddTask from "./components/AddTask";
import Board from "./components/Board";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Study components and JSX",
      status: "todo",
    },
    {
      id: 2,
      title: "Practice CSS",
      description: "Build the Kanban layout",
      status: "todo",
    },
    {
      id: 3,
      title: "Build a project",
      description: "Create a real React application",
      status: "in-progress",
    },
    {
      id: 4,
      title: "Setup GitHub",
      description: "Push the project to GitHub",
      status: "done",
    },
  ]);

  function handleAddTask(newTask) {
    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  function handleEditTask(taskId, updatedTask) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            ...updatedTask,
          };
        }

        return task;
      })
    );
  }

  function handleMoveTask(taskId, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus,
          };
        }

        return task;
      })
    );
  }

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <AddTask onAddTask={handleAddTask} />

      <Board
        todoTasks={todoTasks}
        inProgressTasks={inProgressTasks}
        doneTasks={doneTasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onMove={handleMoveTask}
      />
    </div>
  );
}

export default App;