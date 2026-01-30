import { Calendar, Clock } from "lucide-react";

export default function DateTimePicker({
  label = "Schedule Time",
  value,
  onChange,
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400">{label}</label>

      <div className="flex items-center gap-2 rounded-lg bg-black/30 border border-white/10 px-3 py-2 focus-within:ring-1 focus-within:ring-indigo-500">
        
        {/* Date */}
        <div className="flex items-center gap-2 flex-1">
          <Calendar size={14} className="text-gray-400" />
          <input
            type="date"
            value={value?.date || ""}
            onChange={e =>
              onChange({ ...value, date: e.target.value })
            }
            className="bg-transparent text-sm text-white outline-none w-full
                       [color-scheme:dark]"
          />
        </div>

        <div className="h-4 w-px bg-white/10" />

        {/* Time */}
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-400" />
          <input
            type="time"
            value={value?.time || ""}
            onChange={e =>
              onChange({ ...value, time: e.target.value })
            }
            className="bg-transparent text-sm text-white outline-none
                       [color-scheme:dark]"
          />
        </div>
      </div>
    </div>
  );
}
