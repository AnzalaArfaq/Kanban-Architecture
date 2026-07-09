/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const formatTime = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const TaskCard = ({ task, columnId, isFirst, isLast, updateTask, deleteTask, moveTask }) => {
  const [activeSessionTime, setActiveSessionTime] = useState(0);

  // The Timer Lifecycle Hook
  useEffect(() => {
    let interval = null;
    if (task.isTimerRunning) {
      interval = setInterval(() => {
        setActiveSessionTime(prev => prev + 1);
      }, 1000);
    } else if (!task.isTimerRunning && activeSessionTime !== 0) {
      clearInterval(interval);
    }
    
    // Cleanup function: Prevents memory leaks if component unmounts while timer runs
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ task.isTimerRunning]);

  const toggleTimer = () => {
    if (task.isTimerRunning) {
      // Stopping the timer: Flush local session time to global state
      updateTask(columnId, task.id, { 
        isTimerRunning: false,
        timeSpentSeconds: task.timeSpentSeconds + activeSessionTime 
      });
      setActiveSessionTime(0);
    } else {
      // Starting the timer
      updateTask(columnId, task.id, { isTimerRunning: true });
    }
  };

  const totalDisplayTime = task.timeSpentSeconds + activeSessionTime;

  return (
    <div className="task-card">
      <textarea 
        value={task.text}
        onChange={(e) => updateTask(columnId, task.id, { text: e.target.value })}
        className="task-text-input"
        rows={2}
      />
      
      <div className="task-metrics">
        <span className={`timer-display ${task.isTimerRunning ? "active" : ""}`}>
          ⏱ {formatTime(totalDisplayTime)}
        </span>
        <button 
          className={`btn ${task.isTimerRunning ? "danger" : "success"} small`} 
          onClick={toggleTimer}
        >
          {task.isTimerRunning ? "Stop" : "Start"}
        </button>
      </div>

      <div className="task-actions">
        <button 
          className="icon-btn" 
          disabled={isFirst} 
          onClick={() => moveTask(columnId, task.id, -1)}
        >
          ←
        </button>
        <button 
          className="icon-btn danger" 
          onClick={() => deleteTask(columnId, task.id)}
        >
          Del
        </button>
        <button 
          className="icon-btn" 
          disabled={isLast} 
          onClick={() => moveTask(columnId, task.id, 1)}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default TaskCard;