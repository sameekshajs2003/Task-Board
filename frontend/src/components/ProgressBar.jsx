const ProgressBar = ({ completionRate, total }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Progress</h2>
        <span className="text-sm font-medium text-gray-600">
          {completionRate}% Complete
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out flex items-center justify-end px-2"
          style={{ width: `${completionRate}%` }}
        >
          {completionRate > 10 && (
            <span className="text-xs font-bold text-white">
              {completionRate}%
            </span>
          )}
        </div>
      </div>

      {total > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          {total} {total === 1 ? "task" : "tasks"} total
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
