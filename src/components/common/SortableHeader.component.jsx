// components/SortableHeader.jsx
import { ChevronUp, ChevronDown,ChevronsDownUp } from "lucide-react";

export default function SortHeader({ label, field, sort,onSort }) {
    return (
        <th
            onClick={() => onSort(field)}
            className="px-4 py-3 text-left text-xs font-medium text-gray-400 cursor-pointer select-none"
        >
            <div className="inline-flex items-center gap-1">
                {label}
                { sort.field===field?(
                    sort.order=== 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                ):<ChevronsDownUp size={12}/>}
            </div>
        </th>
    );
}
