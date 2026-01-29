// components/NotificationTable.jsx
import NotificationRow from "./NotificationRow";
import SortableHeader from "./SortableHeader";

export default function NotificationTable({
  data,
  sort,
  setSort,
  onViewError,
  onViewMail,
}) {
  if (!data.length) {
    return (
      <div className="text-center text-gray-400 py-12 text-sm">
        No notification history found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
      <table className="w-full text-left">
        <thead className="bg-white/5">
          <tr>
            <th className="px-4 py-3 text-xs text-gray-400">ID</th>
            <th className="px-4 py-3 text-xs text-gray-400">Receiver</th>
            <th className="px-4 py-3 text-xs text-gray-400">Subject</th>

            <SortableHeader
              label="Attempts"
              field="attemptCount"
              sort={sort}
              setSort={setSort}
            />

            <SortableHeader
              label="Queue Time"
              field="queueEntryTime"
              sort={sort}
              setSort={setSort}
            />

            <SortableHeader
              label="Success Time"
              field="successTime"
              sort={sort}
              setSort={setSort}
            />

            <th className="px-4 py-3 text-xs text-gray-400">Status</th>
            <th className="px-4 py-3 text-xs text-gray-400 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <NotificationRow
              key={item._id}
              data={item}
              onViewError={onViewError}
              onViewMail={onViewMail}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
