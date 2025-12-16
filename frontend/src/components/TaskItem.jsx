const TaskItem = ({ task, onToggle, onDelete }) => {
  const priorityConfig = {
    high: {
      bg: "bg-red-50 hover:bg-red-100",
      border: "border-red-300",
      badge: "bg-red-500 text-white",
    },
    medium: {
      bg: "bg-yellow-50 hover:bg-yellow-100",
      border: "border-yellow-300",
      badge: "bg-yellow-500 text-white",
    },
    low: {
      bg: "bg-blue-50 hover:bg-blue-100",
      border: "border-blue-300",
      badge: "bg-blue-500 text-white",
    },
  };

  const config = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <div
      className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
        config.bg
      } ${config.border} ${task.completed ? "opacity-60" : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded border-2 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      />

      <div className="flex-1">
        <span
          className={`text-gray-800 font-medium ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </span>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${config.badge}`}
      >
        {task.priority}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
        aria-label="Delete task"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
