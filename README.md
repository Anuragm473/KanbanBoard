# Kanban Board App

This is a **Kanban Board App** where you can manage tasks in different stages like "To Do," "In Progress," and "Done." It is user-friendly and helps you organize tasks efficiently. Additionally, it comes with a **Dark Mode** and **Light Mode** feature for a personalized user experience.

---

## Features

1. **Add Tasks**: Create new tasks by entering a title, description, and subtasks.
2. **Edit Tasks**: Modify task details, such as the title, description, subtasks, or status.
3. **Delete Tasks**: Remove tasks you no longer need.
4. **Drag-and-Drop**: Move tasks between columns using a custom drag-and-drop implementation.
5. **Subtask Management**: Add, edit, and toggle the completion status of subtasks for better task management.
6. **Task Details**: View detailed information about a task in a pop-up.
7. **Set Active Board**: Switch between different boards to manage tasks for multiple projects.
8. **Dark Mode/Light Mode**: Toggle between dark and light themes to match your preferences.
9. **Data Persistence**: Tasks and boards are saved locally in your browser using IndexedDB, ensuring data remains intact even after refreshing the page.

---

## How to Use

### 1. **Add a Task**:
   - Click the "Add Task" button in a specific column (e.g., "To Do").
   - Enter the task title, description, and subtasks in the pop-up form.
   - Click the "Add Task" button in the form to save the task.

### 2. **Edit a Task**:
   - Click the "Edit" button on the task card.
   - Update the task title, description, subtasks, or status in the pop-up form.
   - Click "Save Changes" to update the task.

### 3. **Delete a Task**:
   - Click the "Delete" button on the task card.
   - Confirm the deletion in the pop-up dialog.
   - The task will be permanently removed from the board.

### 4. **Move Tasks**:
   - Drag a task card and drop it into another column (e.g., from "To Do" to "In Progress").
   - The task's status will be updated automatically to reflect the new column.

### 5. **View Task Details**:
   - Click on a task card to view its detailed information in a pop-up.
   - The pop-up includes the title, description, and subtasks.

### 6. **Switch Boards**:
   - Use the board selector to switch between different project boards.
   - Active boards display tasks relevant to the selected project.

### 7. **Manage Subtasks**:
   - Within a task's details, view all subtasks.
   - Toggle their completion status by clicking on them.
   - Add or remove subtasks directly in the pop-up.

### 8. **Dark Mode/Light Mode**:
   - Use the theme toggle button in the header or settings menu.
   - The app will switch between dark and light themes, making it comfortable for use in any lighting condition.

---

## How It Works

- **Drag-and-Drop**: The drag-and-drop functionality is custom-built using React state and event handlers (`onDragStart`, `onDragOver`, and `onDrop`). Tasks are dynamically updated based on where they are dropped.
- **Data Storage**: All tasks, boards, and user preferences (e.g., theme) are stored using IndexedDB. The app uses a database named "KanbanBoardDB" to persist data, ensuring it is saved even after refreshing or closing the browser.
- **State Management**: The app uses **React Redux** for managing global state. Redux ensures all tasks, boards, and preferences are efficiently updated and shared across components.
- **Styling**: The app uses **Tailwind CSS** for styling. Tailwind's utility-first approach makes it easy to build a clean and responsive UI.
- **Dark/Light Mode**: Theme preferences are managed globally in Redux, allowing a seamless transition between dark and light modes.
- **Development with Vite**: The app is built using **Vite**, a fast and optimized build tool for modern web applications. Vite provides lightning-fast hot module replacement (HMR) and ensures quick build times.

---

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:
   ```bash
   npm install
    
   ```bash
   npm run dev
   
