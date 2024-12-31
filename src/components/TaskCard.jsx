import React from "react";

const TaskCard = ({ task, moveTask, deleteTask }) => {
  const handleMove = (direction) => {
    const newStatus =
      direction === "left"
        ? task.status === "In Progress"
          ? "To Do"
          : "In Progress"
        : task.status === "To Do"
        ? "In Progress"
        : "Done";
    moveTask(task.id, newStatus);
  };

  return (
    <div className="task-card">
      <div className="task-card-title">{task.title}</div>
      <div className="task-card-description">{task.description}</div>
      <div>
        {task.status !== "To Do" && (
          <button onClick={() => handleMove("left")}>{"<"}</button>
        )}
        {task.status !== "Done" && (
          <button onClick={() => handleMove("right")}>{">"}</button>
        )}
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
