import { useState } from "react";
import {
    Mail,
    AlertTriangle
} from "lucide-react";
import SortHeader from "../common/SortableHeader.component";
import IdCell from "../common/IdCell.component";

export default function NotificationTable({ data, sort, onSort, setView, switchButton }) {
    return (
        <div className="lg:block">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-white/5">
                        <tr>
                            <SortHeader label="ID" field="_id" sort={sort} onSort={onSort} />
                            <th className="px-4 py-3 text-xs text-gray-400">Organization Name</th>
                            <th className="px-4 py-3 text-xs text-gray-400">Receiver</th>
                            <th className="px-4 py-3 text-xs text-gray-400">Subject</th>
                            <SortHeader label="Attempts" field="attemptCount" sort={sort} onSort={onSort} />
                            <SortHeader label="Queue Time" field="queueEntryTime" sort={sort} onSort={onSort} />
                            {switchButton === 'history' ? <SortHeader label="Success Time" field="successTime" sort={sort} onSort={onSort} /> :
                                <SortHeader label="CreatedAt" field="createdAt" sort={sort} onSort={onSort} />}


                            <th className="px-4 py-3 text-xs text-gray-400">Status</th>
                            <th className="px-4 py-3 text-xs text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={8} className="py-16 text-center text-gray-400">
                                    No notification history available
                                </td>
                            </tr>
                        )}

                        {data.map(n => (
                            <tr key={n._id} className="border-t border-white/5 hover:bg-white/5">
                                <td className="px-2 py-3"><IdCell id={n._id} /></td>
                                <td className="px-2 py-3 text-gray-300 ">{n.organizationName ? n.organizationName.substr(0, 12) + "..." : ""}</td>
                                <td className="px-2 py-3 text-gray-300 ">{n.receiverEmailId ? n.receiverEmailId.substr(0, 10) + "..." : ""}</td>
                                <td className="px-2 py-3 truncate text-gray-400">{n.subject ? n.subject.substr(0, 10) + "..." : ""}</td>
                                <td className="px-2 py-3 text-gray-400">{n.attemptCount}</td>
                                <td className="px-2 py-3 text-gray-400">{n.queueEntryTime ? new Date(n.queueEntryTime).toLocaleString() : "—"}</td>
                                {switchButton === 'history' ?
                                    <td className="px-2 py-3 text-gray-400">{n.successTime ? new Date(n.successTime).toLocaleString() : "—"}</td> :
                                    <td className="px-2 py-3 text-gray-400">{n.createdAt ? new Date(n.createdAt).toLocaleString() : "—"}</td>}
                                <td className="px-2 py-3"><StatusBadge status={n.status} /></td>
                                <td className="px-2 py-3 text-right space-x-2">
                                    <button onClick={() => setView(n._id)} className="px-2 py-1 text-xs rounded-md bg-indigo-500/20 text-indigo-300">
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

function StatusBadge({ status }) {
    const STATUS = {
        1: { label: "Idle", cls: "bg-gray-500/20 text-gray-300" },
        2: { label: "Processing", cls: "bg-blue-500/20 text-blue-300" },
        3: { label: "Error", cls: "bg-red-500/20 text-red-300" },
        4: { label: "Success", cls: "bg-green-500/20 text-green-300" },
        5: { label: "Failed", cls: "bg-orange-500/20 text-orange-300" },
        6: { label: "Cancel", cls: "bg-gray-500/20 text-white-300" },
    };
    const s = STATUS[status];
    return (
        <span className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${s.cls}`}>
            {s.label}
        </span>
    );
}