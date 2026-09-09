import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TaskFilters from "./components/TaskFilters";
import AddTask from "./components/AddTask";
import Board from "./components/Board";
import TaskDetailsModal from "./components/TaskDetailsModal";

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
        completedAt: null,
      },
      {
        id: 2,
        title: "Practice CSS",
        description: "Build the Kanban layout",
        status: "todo",
        priority: "medium",
        labels: ["Frontend", "CSS"],
        dueDate: "2026-09-18",
        completedAt: null,
      },
      {
        id: 3,
        title: "Build a project",
        description: "Create a real React application",
        status: "in-progress",
        priority: "high",
        labels: ["Project"],
        dueDate: "2026-09-20",
        completedAt: null,
      },
      {
        id: 4,
        title: "Setup GitHub",
        description: "Push the project to GitHub",
        status: "done",
        priority: "low",
        labels: ["Git"],
        dueDate: "2026-09-10",
        completedAt: new Date().toISOString(),
      },
    ];
  });

  const [draggedTaskId, setDraggedTaskId] =
    useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  // Task currently being viewed
  const [selectedTask, setSelectedTask] =
    useState(null);

  // Save tasks
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // --------------------------------
  // VIEW TASK
  // --------------------------------

  function handleViewTask(task) {
    setSelectedTask(task);
  }

  function handleCloseTaskDetails() {
    setSelectedTask(null);
  }

  // --------------------------------
  // ADD TASK
  // --------------------------------

  function handleAddTask(newTask) {
    const taskWithCompletion = {
      ...newTask,
      completedAt:
        newTask.status === "done"
          ? new Date().toISOString()
          : null,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      taskWithCompletion,
    ]);
  }

  // --------------------------------
  // DELETE TASK
  // --------------------------------

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );

    // If the deleted task is currently open
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  }

  // --------------------------------
  // EDIT TASK
  // --------------------------------

  function handleEditTask(
    taskId,
    updatedTask
  ) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const wasDone =
          task.status === "done";

        const isNowDone =
          updatedTask.status === "done";

        let completedAt =
          task.completedAt || null;

        if (!wasDone && isNowDone) {
          completedAt =
            new Date().toISOString();
        }

        if (wasDone && !isNowDone) {
          completedAt = null;
        }

        return {
          ...task,
          ...updatedTask,
          completedAt,
        };
      })
    );

    // Keep modal information updated
    setSelectedTask((currentSelectedTask) => {
      if (!currentSelectedTask) {
        return null;
      }

      if (currentSelectedTask.id !== taskId) {
        return currentSelectedTask;
      }

      return {
        ...currentSelectedTask,
        ...updatedTask,
      };
    });
  }

  // --------------------------------
  // DRAG START
  // --------------------------------

  function handleDragStart(taskId) {
    setDraggedTaskId(taskId);
  }

  // --------------------------------
  // DRAG / DROP
  // --------------------------------

  function handleDrop(
    newStatus,
    targetTaskId = null
  ) {
    if (draggedTaskId === null) {
      return;
    }

    setTasks((currentTasks) => {
      const draggedTask =
        currentTasks.find(
          (task) =>
            task.id === draggedTaskId
        );

      if (!draggedTask) {
        return currentTasks;
      }

      const remainingTasks =
        currentTasks.filter(
          (task) =>
            task.id !== draggedTaskId
        );

      const wasDone =
        draggedTask.status === "done";

      const isNowDone =
        newStatus === "done";

      let completedAt =
        draggedTask.completedAt || null;

      if (!wasDone && isNowDone) {
        completedAt =
          new Date().toISOString();
      }

      if (wasDone && !isNowDone) {
        completedAt = null;
      }

      const movedTask = {
        ...draggedTask,
        status: newStatus,
        completedAt,
      };

      if (targetTaskId === null) {
        return [
          ...remainingTasks,
          movedTask,
        ];
      }

      const targetIndex =
        remainingTasks.findIndex(
          (task) =>
            task.id === targetTaskId
        );

      if (targetIndex === -1) {
        return [
          ...remainingTasks,
          movedTask,
        ];
      }

      remainingTasks.splice(
        targetIndex,
        0,
        movedTask
      );

      return remainingTasks;
    });

    setDraggedTaskId(null);
  }

  // --------------------------------
  // FILTERING
  // --------------------------------

  const filteredTasks = tasks.filter(
    (task) => {
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
    }
  );

  // --------------------------------
  // COLUMNS
  // --------------------------------

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks =
    filteredTasks.filter(
      (task) =>
        task.status === "in-progress"
    );

  const doneTasks = filteredTasks.filter(
    (task) => task.status === "done"
  );

  // --------------------------------
  // STATISTICS
  // --------------------------------

  const totalTasks = tasks.length;

  const totalTodoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const totalInProgressTasks =
    tasks.filter(
      (task) =>
        task.status === "in-progress"
    ).length;

  const totalDoneTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const progressPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (totalDoneTasks / totalTasks) *
            100
        );

  // --------------------------------
  // RECENTLY COMPLETED
  // --------------------------------

  const recentlyCompleted = tasks
    .filter(
      (task) =>
        task.status === "done" &&
        task.completedAt
    )
    .sort(
      (a, b) =>
        new Date(b.completedAt) -
        new Date(a.completedAt)
    )
    .slice(0, 3);

  // --------------------------------
  // RENDER
  // --------------------------------

  return (
    <div className="app">
      <Header
        total={totalTasks}
        todo={totalTodoTasks}
        inProgress={totalInProgressTasks}
        done={totalDoneTasks}
        progress={progressPercentage}
        recentlyCompleted={
          recentlyCompleted
        }
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
        setPriorityFilter={
          setPriorityFilter
        }
      />

      <Board
        todoTasks={todoTasks}
        inProgressTasks={inProgressTasks}
        doneTasks={doneTasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onViewTask={handleViewTask}
      />

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={handleCloseTaskDetails}
        />
      )}
    </div>
  );
}

export default App;