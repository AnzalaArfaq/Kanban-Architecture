/* eslint-disable no-unused-vars */
import React from "react";
import Column from "./Column";

const Board = ({ columns, updateColumnTitle, deleteColumn, addTask, updateTask, deleteTask, moveTask }) => {
  return (
    <div className="board-layout">
      {columns.map((col, index) => (
        <Column 
          key={col.id} 
          column={col} 
          isFirst={index === 0}
          isLast={index === columns.length - 1}
          updateColumnTitle={updateColumnTitle}
          deleteColumn={deleteColumn}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
};

export default Board;