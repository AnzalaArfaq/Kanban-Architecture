# SRS Kanban Architecture 🚀

A feature-rich, React-based Kanban board application designed to help you manage tasks efficiently while keeping track of the time spent on each task.

## ✨ Features

- **Dynamic Columns:** Create, rename, and delete columns to fit your specific workflow.
- **Task Management:** Easily add new tasks, edit task descriptions in real-time, and delete tasks when they are no longer needed.
- **Progress Tracking (Move Tasks):** Seamlessly move tasks left and right between columns (e.g., from "Todo" to "In Progress").
- **Built-in Time Tracker:** Every task comes with its own individual timer. Start and stop the timer to track exactly how much time is spent on a specific task.
- **Persistent Storage:** Never lose your data! The board state is automatically saved to your browser's `localStorage`.

## 🛠️ Tech Stack

- **Frontend Framework:** React (using Functional Components and Hooks like `useState`, `useEffect`)
- **Styling:** Vanilla CSS
- **State Management:** React Local State + Browser `localStorage`

## 📂 Project Structure

```text
src/
├── App.js            # Main application container and global state management
├── index.css         # Application styling
└── components/
    ├── Board.js      # Renders the layout for all columns
    ├── Column.js     # Handles individual column logic, header, and task lists
    └── TaskCard.js   # Individual task component with integrated time tracker
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need Node.js and npm (Node Package Manager) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd srs-kanban
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or npm start if using Create React App
   ```

4. **Open in Browser:**
   Navigate to the local development URL provided in your terminal (usually `http://localhost:5173` for Vite or `http://localhost:3000` for CRA) to see your app running.

## 💡 Usage

- **Add a Column:** Click the `+ Add Column` button in the header.
- **Rename a Column:** Click on any column title and type to rename it instantly.
- **Add a Task:** Type in the `+ Add task...` input at the bottom of any column and press Enter.
- **Track Time:** Click the **Start** button on a task card to begin tracking time. Click **Stop** to pause and record the elapsed time.
- **Move Tasks:** Use the `←` and `→` arrow buttons on a task card to move it between columns.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
