import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  Copy,
  Mail,
  AlertTriangle,Check
} from "lucide-react";

/* =====================
   Constants
===================== */
const STATUS = {
  1: { label: "Idle", cls: "bg-gray-500/20 text-gray-300" },
  2: { label: "Processing", cls: "bg-blue-500/20 text-blue-300" },
  3: { label: "Error", cls: "bg-red-500/20 text-red-300" },
  4: { label: "Success", cls: "bg-green-500/20 text-green-300" },
  5: { label: "Failed", cls: "bg-orange-500/20 text-orange-300" },
};

/* =====================
   Small Reusable Pieces
===================== */
function SortHeader({ label, field, sort, onSort }) {
  const active = sort.field === field;
  return (
    <th
      onClick={() => onSort(field)}
      className="px-4 py-3 text-left text-xs font-medium text-gray-400 cursor-pointer select-none"
    >
      <div className="inline-flex items-center gap-1">
        {label}
        {active && (
          sort.order === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
        )}
      </div>
    </th>
  );
}

function IdCell({ id }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-2 font-mono text-gray-400">
      <span>
        {id.slice(0, 6)}...{id.slice(-4)}
      </span>

      <button
        onClick={handleCopy}
        className="transition-opacity hover:opacity-100 opacity-70"
        title={copied ? "Copied" : "Copy ID"}
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS[status];
  return (
    <span className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${s.cls}`}>
      {s.label}
    </span>
  );
}

/* =====================
   Desktop / Tablet Table
===================== */
function NotificationTable({ data, sort, onSort }) {
  return (
    <div className="hidden lg:block">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-xs text-gray-400">ID</th>
              <th className="px-4 py-3 text-xs text-gray-400">Receiver</th>
              <th className="px-4 py-3 text-xs text-gray-400">Subject</th>
              <SortHeader label="Attempts" field="attemptCount" sort={sort} onSort={onSort} />
              <SortHeader label="Queue Time" field="queueEntryTime" sort={sort} onSort={onSort} />
              <SortHeader label="Success Time" field="successTime" sort={sort} onSort={onSort} />
              <th className="px-4 py-3 text-xs text-gray-400">Status</th>
              <th className="px-4 py-3 text-xs text-gray-400 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16 text-center text-gray-400">
                  No notification history available
                </td>
              </tr>
            )}

            {data.map(n => (
              <tr key={n._id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3"><IdCell id={n._id} /></td>
                <td className="px-4 py-3 text-gray-300">{n.receiverEmailId}</td>
                <td className="px-4 py-3 max-w-[260px] truncate text-gray-400">{n.subject}</td>
                <td className="px-4 py-3 text-gray-400">{n.attemptCount}</td>
                <td className="px-4 py-3 text-gray-400">{new Date(n.queueEntryTime).toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-400">{n.successTime ? new Date(n.successTime).toLocaleString() : "—"}</td>
                <td className="px-4 py-3"><StatusBadge status={n.status} /></td>
                <td className="px-4 py-3 text-right space-x-2">
                  {(n.status === 3 || n.status === 5) && (
                    <button className="px-2 py-1 text-xs rounded-md bg-red-500/20 text-red-300">
                      <AlertTriangle size={14} className="inline" /> Error
                    </button>
                  )}
                  <button className="px-2 py-1 text-xs rounded-md bg-indigo-500/20 text-indigo-300">
                    <Mail size={14} className="inline" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =====================
   Mobile Cards
===================== */
function NotificationCards({ data }) {
  return (
    <div className="lg:hidden space-y-4">
      {data.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          No notification history available
        </div>
      )}

      {data.map(n => (
        <div key={n._id} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <IdCell id={n._id} />
            <StatusBadge status={n.status} />
          </div>

          <div className="text-sm text-gray-200">{n.receiverEmailId}</div>
          <div className="text-xs text-gray-400">{n.subject}</div>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div>Attempts: {n.attemptCount}</div>
            <div>Queue: {new Date(n.queueEntryTime).toLocaleString()}</div>
            <div>Success: {n.successTime ? new Date(n.successTime).toLocaleString() : "—"}</div>
          </div>

          <div className="flex gap-2 pt-2">
            {(n.status === 3 || n.status === 5) && (
              <button className="flex-1 px-3 py-2 rounded-md bg-red-500/20 text-red-300 text-xs">
                Error
              </button>
            )}
            <button className="flex-1 px-3 py-2 rounded-md bg-indigo-500/20 text-indigo-300 text-xs">
              View Mail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =====================
   Main Page
===================== */
export default function NotificationHistory() {
  const [sort, setSort] = useState({ field: "queueEntryTime", order: "desc" });

  const onSort = field => {
    setSort(p => ({
      field,
      order: p.field === field && p.order === "asc" ? "desc" : "asc",
    }));
  };

    const  data=[
        {
            _id:"697839521635cff277d63b55",
            receiverEmailId:"sourav@gmail.com",
            subject:"abc",
            attemptCount:1,
            status:1
        },
        {
            _id:"697839521635cff277d6333",
            receiverEmailId:"sourav@gmail.com",
            subject:"abcdljflsdjfldsflsdfndslfdsldfldskfjdslfjsdlfjdsljflsdjfljsfldsjfldsjfldsjl",
            attemptCount:1,
            status:3
        }
    ]// replace with API data

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4 sm:px-6 lg:px-12 py-8 text-white">
      <h1 className="text-xl font-semibold mb-6">Notification History</h1>

      <NotificationTable data={data} sort={sort} onSort={onSort} />
      <NotificationCards data={data} />
    </div>
  );
}