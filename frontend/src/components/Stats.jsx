const Stats = ({ stats }) => {
  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200">
        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
          Total
        </p>
        <p className="text-2xl font-bold text-indigo-700">{stats.total}</p>
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
        <p className="text-xs text-green-600 font-medium uppercase tracking-wide">
          Completed
        </p>
        <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
      </div>

      <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
        <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">
          Pending
        </p>
        <p className="text-2xl font-bold text-orange-700">{stats.pending}</p>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
        <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">
          High Priority
        </p>
        <p className="text-2xl font-bold text-purple-700">
          {stats.by_priority.high}
        </p>
      </div>
    </div>
  );
};

export default Stats;
