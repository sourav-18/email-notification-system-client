// components/SortableHeader.jsx
import { ArrowUp, ArrowDown } from "lucide-react";

export default function SortableHeader({ label, field, sort, setSort }) {
  const isActive = sort?.field === field;

  return (
    <th className="px-4 py-3 text-xs text-gray-400">
      <div className="flex items-center gap-1">
        {label}
        <button
          onClick={() => setSort({ field, order: "asc" })}
          className={isActive && sort.order === "asc" ? "text-white" : ""}
        >
          <ArrowUp size={12} />
        </button>
        <button
          onClick={() => setSort({ field, order: "desc" })}
          className={isActive && sort.order === "desc" ? "text-white" : ""}
        >
          <ArrowDown size={12} />
        </button>
      </div>
    </th>
  );
}
