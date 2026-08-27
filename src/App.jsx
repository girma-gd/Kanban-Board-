import "./App.css";
import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskCard from "./components/TaskCard";

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


  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );

  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <AddTask onAddTask={handleAddTask} />

      <div className="board">

        <div className="column">
          <h2>Todo</h2>

          {todoTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>

        <div className="column">
          <h2>In Progress</h2>

          {inProgressTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>

        <div className="column">
          <h2>Done</h2>

          {doneTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;