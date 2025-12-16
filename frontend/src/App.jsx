import axios from "axios";
import { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import Stats from "./components/Stats";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const API_URL = "/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //Fetch stats
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchTasks(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, []);

  //Add task
  const addTask = async (title, priority) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        title,
        priority,
      });
      setTasks([...tasks, response.data]);
      await fetchStats();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  //task completion
  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
      await fetchStats();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  //Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
      await fetchStats();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const completionRate = stats ? stats.completion_rate : 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-300 to-orange-400 px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Task Board</h1>
          <p className="text-indigo-100">
            Organize your work with priority management
          </p>
        </div>

        <div className="p-8">
          <ProgressBar completionRate={completionRate} total={tasks.length} />
          {stats && <Stats stats={stats} />}
          <TaskInput onAddTask={addTask} />
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg">No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200"></div>
      </div>
    </div>
  );
}

export default App;
