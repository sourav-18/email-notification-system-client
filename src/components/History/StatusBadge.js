// components/StatusBadge.jsx

export default function StatusBadge({ status }) {
    // utils/statusMap.js
    const STATUS_MAP = {
        1: { label: "Idle", color: "bg-slate-500/20 text-slate-300" },
        2: { label: "Processing", color: "bg-blue-500/20 text-blue-300" },
        3: { label: "Error", color: "bg-red-500/20 text-red-300" },
        4: { label: "Success", color: "bg-green-500/20 text-green-300" },
        5: { label: "Failed", color: "bg-orange-500/20 text-orange-300" },
    };

    const data = STATUS_MAP[status];

    return (
        <span
            className={`px-2 py-0.5 text-xs rounded-md border border-white/10 ${data.color}`}
        >
            {data.label}
        </span>
    );
}
