
import "./App.css";
import TaskCard from "./components/TaskCard";

function App() {
  const tasks = [
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
];
  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <div className="board">

        <div className="column">
          <h2>Todo</h2>
        
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </div>

        <div className="column">
          <h2>In Progress</h2>

          <TaskCard
            title={tasks[2].title}
            description={tasks[2].description}
          />
        </div>

        <div className="column">
          <h2>Done</h2>
        </div>

      </div>
    </div>
  );
}

export default App;