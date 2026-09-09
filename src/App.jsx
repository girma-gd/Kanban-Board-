import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskFilters from "./components/TaskFilters";
import AddTask from "./components/AddTask";
import Board from "./components/Board";

function App() {
  const STORAGE_KEY = "kanban-tasks";
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [
    {
      id: 1,
      title: "Learn React",
      description: "Study components and JSX",
      status: "todo",
      priority: "high",
      labels: ["Learning"],
    },
    {
      id: 2,
      title: "Practice CSS",
      description: "Build the Kanban layout",
      status: "todo",
      priority: "medium",
      labels: ["Frontend", "CSS"],
    },
    {
      id: 3,
      title: "Build a project",
      description: "Create a real React application",
      status: "in-progress",
      priority: "high",
      labels: ["Project"],
    },
    {
      id: 4,
      title: "Setup GitHub",
      description: "Push the project to GitHub",
      status: "done",
      priority: "low",
      labels: ["Git"],
    },
  ];
});
  useEffect(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      );
    }, [tasks]
  );
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
    
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
          }
        }

        return task;
      })
    );
  }
    
  function handleDragStart(taskId) {
  setDraggedTaskId(taskId);
    }

  const filteredTasks = tasks.filter((task) => {
      const searchText = search.toLowerCase().trim();
    
      const matchesSearch =
        searchText === "" ||
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText) ||
        task.labels?.some((label) =>
          label.toLowerCase().includes(searchText)
        );
    
      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;
    
      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;
    
      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
        
  function handleDrop(newStatus, targetTaskId = null) {
      if (draggedTaskId === null) return;
    
      setTasks((currentTasks) => {
        const draggedTask = currentTasks.find(
          (task) => task.id === draggedTaskId
        );
    
        if (!draggedTask) return currentTasks;
    
        const remainingTasks = currentTasks.filter(
          (task) => task.id !== draggedTaskId
        );
    
        const movedTask = {
          ...draggedTask,
          status: newStatus,
        };
    
        // Dropped into empty space in a column
        if (targetTaskId === null) {
          return [...remainingTasks, movedTask];
        }
    
        const targetIndex = remainingTasks.findIndex(
          (task) => task.id === targetTaskId
        );
    
        // Target task wasn't found
        if (targetIndex === -1) {
          return [...remainingTasks, movedTask];
        }
    
        // Insert the dragged task before the target task
        remainingTasks.splice(targetIndex, 0, movedTask);
    
        return remainingTasks;
      });

  setDraggedTaskId(null);
  }
  const totalTasks = tasks.length;

  const totalTodoTasks = tasks.filter(
      (task) => task.status === "todo"
    ).length;
    
  const totalInProgressTasks = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    
  const totalDoneTasks = tasks.filter(
      (task) => task.status === "done"
    ).length;

  const todoTasks = filteredTasks.filter(
      (task) => task.status === "todo"
    );
    
  const inProgressTasks = filteredTasks.filter(
      (task) => task.status === "in-progress"
    );
    
  const doneTasks = filteredTasks.filter(
      (task) => task.status === "done"
    );

  return (
    <div className="app">
      <Header
          total={totalTasks}
          todo={totalTodoTasks}
          inProgress={totalInProgressTasks}
          done={totalDoneTasks}
     />
    
      <AddTask onAddTask={handleAddTask} />
      <TaskFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      <Board
          todoTasks={todoTasks}
          inProgressTasks={inProgressTasks}
          doneTasks={doneTasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
      />
    </div>
  );
}

export default App;