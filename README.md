# Kanban Board App

This is a **Kanban Board App** where you can manage tasks in different stages like "To Do," "In Progress," and "Done." It is simple to use and helps you organize your tasks better.

---

## Features

1. **Add Tasks**: You can add new tasks by providing a title and description.
2. **Edit Tasks**: You can edit the title and description of existing tasks.
3. **Delete Tasks**: Remove tasks you no longer need.
4. **Drag-and-Drop**: Move tasks between columns by dragging them.
5. **Task Details**: Click on a task to view its details.
6. **Data Storage**: Tasks are saved locally in your browser using IndexedDB. This means your data stays even if you refresh the page.

---

## How to Use

1. **Add a Task**:
   - Click the "Add Task" button.
   - Enter the task title and description in the pop-up form.
   - Click the "Add Task" button in the form to save the task.

2. **Edit a Task**:
   - Click the "Edit" button on the task card.
   - Update the task title and description in the pop-up form.
   - Click "Save Changes" to update the task.

3. **Delete a Task**:
   - Click the "Delete" button on the task card.
   - The task will be removed from the board.

4. **Move Tasks**:
   - Drag a task card and drop it into another column (e.g., from "To Do" to "In Progress").
   - The task's status will be updated automatically.

5. **View Task Details**:
   - Click on a task card to see more details about the task.
   - A pop-up will show the title and description.

---

## How It Works

- **Drag-and-Drop**: The app uses `@hello-pangea/dnd` for drag-and-drop functionality.
- **Data Storage**: Tasks are stored in the browser using IndexedDB. The app creates a database named "KanbanBoardDB" to store tasks. This ensures that your data is saved even after refreshing the page.
- **React Components**: The app is built with React, and all the logic is divided into simple components.

