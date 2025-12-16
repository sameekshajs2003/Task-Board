import { useState } from "react";

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, priority);
      setTitle("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 cursor-pointer"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-orange-300 to-orange-400 text-white rounded-lg font-semibold hover:from-orange-400 hover:to-orange-500 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
