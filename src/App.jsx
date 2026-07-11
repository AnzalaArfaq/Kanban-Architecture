import { useState, useEffect } from "react";
import "./index.css";
import Board from "./components/Board";

const generateUniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

function App() {
  const [columns, setColumns] = useState(() => {
    const savedData = localStorage.getItem("kanban_srs_state");
    return savedData
      ? JSON.parse(savedData)
      : [
          { id: generateUniqueId(), title: "Todo", tasks: [] },
          { id: generateUniqueId(), title: "In Progress", tasks: [] },
          { id: generateUniqueId(), title: "Complete", tasks: [] },
        ];
  });

  useEffect(() => {
    localStorage.setItem("kanban_srs_state", JSON.stringify(columns));
  }, [columns]);

  // Column Related Functions {add, delete, modify/edit}
  const addColumn = () => {
    const newCol = { id: generateUniqueId(), title: "New Column", tasks: [] };
    setColumns([...columns, newCol]);
  };

  const delColumn = (colId) => {
    setColumns(columns.filter((c) => colId !== c.id));
  };

  const updateColumn = (colId, newTitle) => {
    setColumns(
      columns.map((c) => (c.id === colId ? { ...c, title: newTitle } : c))
    );
  };

  // Task Related Functions {add, update, delete, move}
  const addTask = (colId, taskText) => {
    const newTask = {
      id: generateUniqueId(), // FIX: Invoked function
      text: taskText, // FIX: Changed 'name' to 'text' to match TaskCard
      timeSpentSeconds: 0,
      isTimerRunning: false,
      status: "pending", // FIX: Typo from "panding"
    };
    
    setColumns((prevCols) =>
      prevCols.map((c) =>
        c.id === colId ? { ...c, tasks: [...c.tasks, newTask] } : c
      )
    ); // FIX: Returned updated state properly, used 'tasks' instead of 'task'
  };

  const delTask = (colId, taskId) => {
    setColumns((prevCols) =>
      prevCols.map((c) =>
        c.id === colId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c
      )
    );
  };

  const updateTask = (colId, taskId, updates) => {
    setColumns((prevCols) =>
      prevCols.map((c) =>
        c.id === colId
          ? {
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId ? { ...t, ...updates } : t // FIX: Correctly spread ...t
              ),
            }
          : c
      )
    );
  };

  // FIX: Aligned signature to match TaskCard: (colId, taskId, direction)
  const movTask = (colId, taskId, direction) => {
    setColumns((prevCols) => {
      const sourceIndex = prevCols.findIndex((c) => c.id === colId);
      const targetIndex = sourceIndex + direction; // FIX: + direction fixes the math

      if (targetIndex < 0 || targetIndex >= prevCols.length) return prevCols;

      let taskToMove = null;

      // Extract the task from the source column
      const updatedSourceTasks = prevCols[sourceIndex].tasks.filter((t) => {
        if (t.id === taskId) {
          taskToMove = t;
          return false;
        }
        return true;
      });

      if (!taskToMove) return prevCols;

      // Create a fresh copy of columns to mutate immutably
      const newCols = [...prevCols];
      newCols[sourceIndex] = { ...newCols[sourceIndex], tasks: updatedSourceTasks };
      newCols[targetIndex] = {
        ...newCols[targetIndex],
        tasks: [...newCols[targetIndex].tasks, taskToMove],
      };

      return newCols;
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SRS Kanban Architecture</h1>
        <button className="btn primary" onClick={addColumn}>
          + Add Column
        </button>
      </header>
      <Board 
        columns={columns}
        updateColumnTitle={updateColumn}
        deleteColumn={delColumn}
        addTask={addTask}
        deleteTask={delTask}
        moveTask={movTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default App;