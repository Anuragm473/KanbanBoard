import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { openDB } from "idb";
import "./../styles/styles.css";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);

  const dbName = "KanbanBoardDB";

  const initDB = async () => {
    const db = await openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
        }
      },
    });
    return db;
  };

  const loadTasks = async () => {
    const db = await initDB();
    const allTasks = await db.getAll("tasks");
    const categorizedTasks = { "To Do": [], "In Progress": [], Done: [] };
    allTasks.forEach((task) => categorizedTasks[task.status].push(task));
    setTasks(categorizedTasks);
  };

  const saveTaskToDB = async (task) => {
    const db = await initDB();
    await db.put("tasks", task);
  };

  const updateTaskInDB = async (task) => {
    const db = await initDB();
    await db.put("tasks", task);
  };

  const deleteTaskFromDB = async (id) => {
    const db = await initDB();
    await db.delete("tasks", id);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destinationColumn = tasks[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = Array.from(sourceColumn);
      const [movedTask] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, movedTask);

      setTasks({ ...tasks, [source.droppableId]: reorderedTasks });
    } else {
      const [movedTask] = sourceColumn.splice(source.index, 1);
      movedTask.status = destination.droppableId;

      destinationColumn.splice(destination.index, 0, movedTask);

      await updateTaskInDB(movedTask);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      });
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description) {
      alert("Please fill in all fields!");
      return;
    }

    const task = { ...newTask, status: "To Do" };
    await saveTaskToDB(task);
    loadTasks();
    setNewTask({ title: "", description: "" });
    setIsModalOpen(false);
  };

  const handleEditTask = async () => {
    if (!editingTask.title || !editingTask.description) {
      alert("Please fill in all fields!");
      return;
    }

    await updateTaskInDB(editingTask);
    loadTasks();
    setEditingTask(null);
    setIsEditModalOpen(false);
  };

  const deleteTask = async (id, column) => {
    const updatedColumn = tasks[column].filter((task) => task.id !== id);
    setTasks({ ...tasks, [column]: updatedColumn });
    await deleteTaskFromDB(id);
  };

  return (
    <div className="kanban-container">
      <h1>Kanban Board</h1>
      <button
        className="add-task-button"
        onClick={() => setIsModalOpen(true)}
      >
        Add Task
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.keys(tasks).map((column) => (
            <Droppable droppableId={column} key={column}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{column}</h2>
                  {tasks[column].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => {
                            setTaskDetails(task);
                            setIsDetailsModalOpen(true);
                          }}
                        >
                          <div className="task-card-title">{task.title}</div>
                          <div className="task-card-description">
                            {task.description}
                          </div>
                          <button
                            className="delete-task-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask(task.id, column);
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="edit-task-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTask(task);
                              setIsEditModalOpen(true);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="modal-input"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="modal-textarea"
            />
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleAddTask}>
                Add Task
              </button>
              <button
                className="modal-button cancel"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={editingTask?.title || ""}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              className="modal-input"
            />
            <textarea
              placeholder="Task Description"
              value={editingTask?.description || ""}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
              className="modal-textarea"
            />
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleEditTask}>
                Save Changes
              </button>
              <button
                className="modal-button cancel"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {isDetailsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {taskDetails?.title}</p>
            <p><strong>Description:</strong> {taskDetails?.description}</p>
            <button
              className="modal-button cancel"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;