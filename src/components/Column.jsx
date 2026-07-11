import { useState } from "react";
import TaskCard from "./TaskCard";

const Column = ({
  column,
  isFirst,
  isLast,
  updateColumnTitle,
  deleteColumn,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
}) => {
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = (e) =>{
    e.preventDefault();
    if (!taskInput.trim()) return;
    addTask(column.id, taskInput);
    setTaskInput("");
  }
  return (
    <div className="column">
      <div className="column-header">
        <input
          type="text"
          value={column.title}
          onChange={(e) => updateColumnTitle(column.id, e.target.value)}
          className="column-title-input"
        />
        <button
          type="button"
          className="icon-btn danger"
          onClick={() => deleteColumn(column.id)}
        >
          x
        </button>
      </div>
      <div className="task-list">
        {column.tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            columnId={column.id}
            isFirst={isFirst}
            isLast={isLast}
            updateTask={updateTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
          />
        ))}
      </div>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          placeholder="+ Add task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Column;
