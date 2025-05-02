import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

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
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <div className="container">
     <button className="toggle-mode" onClick={toggleDarkMode}>
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
      <h1>Task Manager</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add" onClick={handleAdd}>Add</button>
      </div>

      {tasks.map((t, i) => (
        <div key={i} className={`task ${t.completed ? "completed" : ""}`}>
          <span>{t.text}</span>
          <div>
            <button className="complete" onClick={() => handleComplete(i)}>✔</button>
            <button className="delete" onClick={() => handleDelete(i)}>✖</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
