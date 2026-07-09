/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./index.css";

const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

function App() {
  // Data Hydration from localStorage
  const [columns, setColumns] = useState(() => {
    const savedData = localStorage.getItem("kanban_srs_state");
    return savedData ? JSON.parse(savedData) : [
      { id: "col-1", title: "To Do", tasks: [] },
      { id: "col-2", title: "In Progress", tasks: [] },
      { id: "col-3", title: "Done", tasks: [] }
    ];
  });

  // Data Persistence
  useEffect(() => {
    localStorage.setItem("kanban_srs_state", JSON.stringify(columns));
  }, [columns]);

  // --- COLUMN MANAGEMENT ---
  const addColumn = () => {
    const newCol = { id: generateUniqueId(), title: "New Column", tasks: [] };
    setColumns([...columns, newCol]);
  };

  const updateColumnTitle = (colId, newTitle) => {
    setColumns(columns.map(c => c.id === colId ? { ...c, title: newTitle } : c));
  };

  const deleteColumn = (colId) => {
    setColumns(columns.filter(c => c.id !== colId));
  };

  // --- TASK MANAGEMENT ---
  const addTask = (colId, taskText) => {
    const newTask = {
      id: generateUniqueId(),
      text: taskText,
      timeSpentSeconds: 0,
      isTimerRunning: false
    };
    setColumns(columns.map(c => {
      if (c.id === colId) return { ...c, tasks: [...c.tasks, newTask] };
      return c;
    }));
  };

  const updateTask = (colId, taskId, updates) => {
    setColumns(columns.map(c => {
      if (c.id === colId) {
        return {
          ...c,
          tasks: c.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
        };
      }
      return c;
    }));
  };

  const deleteTask = (colId, taskId) => {
    setColumns(columns.map(c => {
      if (c.id === colId) {
        return { ...c, tasks: c.tasks.filter(t => t.id !== taskId) };
      }
      return c;
    }));
  };

  const moveTask = (sourceColId, taskId, direction) => {
    const sourceColIndex = columns.findIndex(c => c.id === sourceColId);
    const targetColIndex = sourceColIndex + direction; // -1 for left, +1 for right

    if (targetColIndex < 0 || targetColIndex >= columns.length) return;

    let taskToMove = null;
    
    // Remove from source
    const updatedSourceTasks = columns[sourceColIndex].tasks.filter(t => {
      if (t.id === taskId) {
        taskToMove = t;
        return false;
      }
      return true;
    });

    if (!taskToMove) return;

    // Build new columns array
    const newColumns = [...columns];
    newColumns[sourceColIndex] = { ...newColumns[sourceColIndex], tasks: updatedSourceTasks };
    newColumns[targetColIndex] = { ...newColumns[targetColIndex], tasks: [...newColumns[targetColIndex].tasks, taskToMove] };

    setColumns(newColumns);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SRS Kanban Architecture</h1>
        <button className="btn primary" onClick={addColumn}>+ Add Column</button>
      </header>
      <Board 
        columns={columns}
        updateColumnTitle={updateColumnTitle}
        deleteColumn={deleteColumn}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        moveTask={moveTask}
      />
    </div>
  );
}

export default App;