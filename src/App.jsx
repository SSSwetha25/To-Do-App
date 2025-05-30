import { useState, useEffect, useCallback } from "react";
import { Plus, Check, Trash2, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(true);

  const handleAdd = useCallback(() => {
    if (task.trim() !== "") {
      setTasks((prev) => [...prev, { text: task.trim(), completed: false }]);
      setTask("");
    }
  }, [task]);

  const handleComplete = useCallback((index) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const handleDelete = useCallback((index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } flex items-center justify-center p-4`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-black"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Input + Add Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter a task"
            className={`flex-grow px-4 py-3 rounded-lg border shadow-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition
              ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  : "bg-gray-200 text-gray-900 border-gray-300 placeholder-gray-600"
              }`}
          />
          <button
            onClick={() => {
              handleAdd();
            }}
            className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            title="Add task"
          >
            <b>Add</b>
          </button>
        </div>

        {/* Tasks List with AnimatePresence */}
        <AnimatePresence initial={false}>
          {tasks.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex justify-between items-center p-3 mt-4 rounded-lg shadow-md break-words ${
                t.completed
                  ? `${
                      darkMode
                        ? "bg-green-900 text-gray-300 line-through"
                        : "bg-green-100 text-gray-500 line-through"
                    }`
                  : `${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`
              }`}
            >
              {/* <span className="break-words">{t.text}</span> */}
              <span className="break-words w-full">{t.text}</span>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleComplete(i)}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  aria-label="Complete"
                  title="Complete task"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  aria-label="Delete"
                  title="Delete task"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Task Counter */}
        {tasks.length > 0 && (
          <div className="text-right text-sm text-gray-400 dark:text-gray-500 mt-4">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
