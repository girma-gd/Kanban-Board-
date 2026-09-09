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
        dueDate: "2026-09-15",
      },
      {
        id: 2,
        title: "Practice CSS",
        description: "Build the Kanban layout",
        status: "todo",
        priority: "medium",
        labels: ["Frontend", "CSS"],
        dueDate: "2026-09-18",
      },
      {
        id: 3,
        title: "Build a project",
        description: "Create a real React application",
        status: "in-progress",
        priority: "high",
        labels: ["Project"],
        dueDate: "2026-09-20",
      },
      {
        id: 4,
        title: "Setup GitHub",
        description: "Push the project to GitHub",
        status: "done",
        priority: "low",
        labels: ["Git"],
        dueDate: "2026-09-10",
      },
    ];
  });

  // Save tasks whenever the task list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [priorityFilter, setPriorityFilter] = useState("all");

  // -----------------------------
  // ADD TASK
  // -----------------------------

  function handleAddTask(newTask) {
    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  }

  // -----------------------------
  // DELETE TASK
  // -----------------------------

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  // -----------------------------
  // EDIT TASK
  // -----------------------------

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

  // -----------------------------
  // DRAG START
  // -----------------------------

  function handleDragStart(taskId) {
    setDraggedTaskId(taskId);
  }

  // -----------------------------
  // DRAG / DROP
  // -----------------------------

  function handleDrop(newStatus, targetTaskId = null) {
    if (draggedTaskId === null) return;

    setTasks((currentTasks) => {
      const draggedTask = currentTasks.find(
        (task) => task.id === draggedTaskId
      );

      if (!draggedTask) {
        return currentTasks;
      }

      // Remove the dragged task from its current position
      const remainingTasks = currentTasks.filter(
        (task) => task.id !== draggedTaskId
      );

      // Update the task's status
      const movedTask = {
        ...draggedTask,
        status: newStatus,
      };

      // --------------------------------
      // Drop into empty space
      // --------------------------------

      if (targetTaskId === null) {
        return [
          ...remainingTasks,
          movedTask,
        ];
      }

      // --------------------------------
      // Find target task
      // --------------------------------

      const targetIndex = remainingTasks.findIndex(
        (task) => task.id === targetTaskId
      );

      // Target task doesn't exist
      if (targetIndex === -1) {
        return [
          ...remainingTasks,
          movedTask,
        ];
      }

      // --------------------------------
      // Insert before target task
      // --------------------------------

      remainingTasks.splice(
        targetIndex,
        0,
        movedTask
      );

      return remainingTasks;
    });

    setDraggedTaskId(null);
  }

  // -----------------------------
  // SEARCH + FILTERING
  // -----------------------------

  const filteredTasks = tasks.filter((task) => {
    const searchText = search
      .toLowerCase()
      .trim();

    const matchesSearch =
      searchText === "" ||
      task.title
        .toLowerCase()
        .includes(searchText) ||
      task.description
        .toLowerCase()
        .includes(searchText) ||
      task.labels?.some((label) =>
        label
          .toLowerCase()
          .includes(searchText)
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

  // -----------------------------
  // COLUMN TASKS
  // -----------------------------

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );

  const doneTasks = filteredTasks.filter(
    (task) => task.status === "done"
  );

  // -----------------------------
  // STATISTICS
  // -----------------------------

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

  // -----------------------------
  // RENDER
  // -----------------------------

  return (
    <div className="app">
      <Header
        total={totalTasks}
        todo={totalTodoTasks}
        inProgress={totalInProgressTasks}
        done={totalDoneTasks}
      />

      <AddTask
        onAddTask={handleAddTask}
      />

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