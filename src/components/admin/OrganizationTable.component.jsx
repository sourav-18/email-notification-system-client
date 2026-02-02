import { useState } from "react";
import { ToggleLeft, ToggleRight } from 'lucide-react';
import {
  Mail,
  AlertTriangle
} from "lucide-react";
import SortHeader from "../common/SortableHeader.component";
import IdCell from "../common/IdCell.component";
import constantData from "../../utils/constant.util";

export default function OrganizationTable({ data, sort, onSort, setStatusUpdate }) {

  return (
    <div className="lg:block">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <SortHeader label="ID" field="_id" sort={sort} onSort={onSort} />
              <th className="px-4 py-3 text-xs text-gray-400">Name</th>
              <th className="px-4 py-3 text-xs text-gray-400">Email</th>
              <SortHeader label="LastLogin" field="lastLoginTime" sort={sort} onSort={onSort} />
              <SortHeader label="CreatedAt" field="createdAt" sort={sort} onSort={onSort} />
              <th className="px-4 py-3 text-xs text-gray-400">Status</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {data && data.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16 text-center text-gray-400">
                  No organizations history available
                </td>
              </tr>
            )}

            {data && data.map(n => (
              <tr key={n._id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3"><IdCell id={n._id} /></td>
                <td className="px-4 py-3 max-w-[260px] truncate text-gray-400">{n.name}</td>
                <td className="px-4 py-3 text-gray-300 ">{n.emailId}</td>
                <td className="px-4 py-3 text-gray-400">{n.lastLoginTime ? new Date(n.lastLoginTime).toLocaleString() : "—"}</td>
                <td className="px-4 py-3 text-gray-400">{n.createdAt ? new Date(n.createdAt).toLocaleString() : "—"}</td>
                <td className="px-4 py-3 text-gray-300 flex justify-center">
                  <button
                    onClick={() => {
                      setStatusUpdate({
                        id: n._id, status: n.status === constantData.organization.status.active ?
                          constantData.organization.status.inactive :
                          constantData.organization.status.active
                      })
                    }}
                    className="flex items-center text-sm font-medium focus:outline-none"
                  >
                    {n?.status == constantData.organization.status.active ? (
                      <ToggleRight className="text-green-400" />
                    ) : (
                      <ToggleLeft className="text-gray-500" />
                    )}
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
