import { useAuth } from "../../../../context/AuthContext";

export const Taskcard = ({ task, onApply }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const hasApplied = task.applicant?.includes(uid);
  const isOwner = task.postedBy === uid;

  const canApply = task.status === "open" && !hasApplied && !isOwner;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out group">
      <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
        {task.title}
      </h2>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{task.description}</p>

      <div className="space-y-3 text-sm text-gray-700">
        <InfoRow label="Category" value={task.category || 'N/A'} />
        <InfoRow label="Budget" value={`₹${task.budget}`} />
        <InfoRow label="Deadline" value={task.deadline || 'N/A'} />
        <InfoRow
          label="Status"
          value={task.status}
          valueClass={`capitalize font-semibold ${
            task.status === 'open' ? 'text-green-600' : 'text-red-500'
          }`}
        />
        <InfoRow label="Posted By" value={task.postedBy} isTruncated />
        <InfoRow
          label="Created At"
          value={task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}
        />
        <InfoRow label="Assigned To" value={task.assignedTo || 'Not assigned'} />
        <InfoRow
          label="Assigned At"
          value={task.assignedAt ? new Date(task.assignedAt).toLocaleString() : 'N/A'}
        />
        <InfoRow
          label="Completed At"
          value={task.completedAt ? new Date(task.completedAt).toLocaleString() : 'N/A'}
        />
        <InfoRow
          label="Submitted At"
          value={task.submittedAt ? new Date(task.submittedAt).toLocaleString() : 'N/A'}
        />
      </div>

      {/* Apply Button */}
      {task.status === "open" && !isOwner && (
        <button
          onClick={() => onApply(task.id)}
          disabled={!canApply}
          className={`mt-5 w-full py-2 px-4 rounded-lg text-white font-semibold transition 
            ${
              hasApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {hasApplied ? "Already Applied" : "Apply for Task"}
        </button>
      )}
    </div>
  );
};

// 🔁 Reusable row for cleaner JSX
const InfoRow = ({ label, value, valueClass = '', isTruncated = false }) => (
  <div className="flex justify-between items-center">
    <span className="font-medium text-gray-500">{label}:</span>
    <span
      className={`text-right ${valueClass} ${isTruncated ? 'truncate max-w-[150px]' : ''}`}
      title={isTruncated ? value : undefined}
    >
      {value}
    </span>
  </div>
);
