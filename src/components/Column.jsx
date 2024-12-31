import React, { useState } from "react";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, moveTask, deleteTask, addTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle && newTaskDescription) {
      addTask(newTaskTitle, newTaskDescription);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      ))}
      {title === "To Do" && (
        <div className="add-task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
    </div>
  );
};

export default Column;
