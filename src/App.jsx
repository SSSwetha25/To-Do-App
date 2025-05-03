import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const handleAdd = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const handleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={(e) => {
              handleAdd();
              e.target.blur();
            }}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Add
          </button>
        </div>

        {tasks.map((t, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-3 mt-4 rounded-md shadow-md ${t.completed
              ? "bg-green-100 line-through text-gray-500 dark:bg-green-900"
              : "bg-gray-100 dark:bg-gray-700 dark:text-white"}`}
          >
            <span>{t.text}</span>
            <div className="space-x-2">
              <button
                onClick={(e) => {
                  handleComplete(i);
                  e.target.blur();
                }}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                ✔
              </button>
              <button
                onClick={(e) => {
                  handleDelete(i);
                  e.target.blur();
                }}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
