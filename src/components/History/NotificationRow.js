// components/NotificationRow.jsx
import StatusBadge from "./StatusBadge";
import IdCell from "./IdCell";

export default function NotificationRow({ data, onViewError, onViewMail }) {
  const formatTime = t =>
    t ? new Date(t).toLocaleString() : "—";

  return (
    <tr className="hover:bg-white/5 transition">
      <td className="px-4 py-3">
        <IdCell id={data._id} />
      </td>

      <td className="px-4 py-3 text-sm text-gray-300">
        {data.receiverEmailId}
      </td>

      <td className="px-4 py-3 text-sm text-gray-400 truncate max-w-[180px]">
        {data.subject}
      </td>

      <td className="px-4 py-3 text-sm text-gray-400">
        {data.attemptCount}
      </td>

      <td className="px-4 py-3 text-sm text-gray-400">
        {formatTime(data.queueEntryTime)}
      </td>

      <td className="px-4 py-3 text-sm text-gray-400">
        {formatTime(data.successTime)}
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={data.status} />
      </td>

      <td className="px-4 py-3 text-right space-x-2">
        {(data.status === 3 || data.status === 5) && (
          <button
            onClick={() => onViewError(data)}
            className="text-xs px-2 py-1 rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/30"
          >
            Error
          </button>
        )}

        <button
          onClick={() => onViewMail(data)}
          className="text-xs px-2 py-1 rounded-md bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30"
        >
          View Mail
        </button>
      </td>
    </tr>
  );
}
