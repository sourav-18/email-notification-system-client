import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

function Filter({ filterData,selected,setSelected,defaultFilter,width="w-64" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${width}`}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="
          w-full flex items-center justify-between
          px-4 py-2 rounded-xl text-sm
          bg-slate-800/40 border border-white/10
          text-gray-200 backdrop-blur-md
          hover:bg-slate-800/60
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500/30
        "
      >
        <span className="truncate">{selected.value}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute z-50 mt-3 w-full
          rounded-2xl border border-white/10
          bg-slate-950/95
          shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)]
          backdrop-blur-xl
          transition-all duration-200 origin-top
          ${
            open
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }
        `}
      >
        <ul
          className="
            py-2 max-h-80 overflow-y-auto
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-slate-700/70
            hover:scrollbar-thumb-slate-600
          "
        >
          {/* Default */}
       {defaultFilter&&   <li
            onClick={() => {
              setSelected(defaultFilter);
              setOpen(false);
            }}
            className="
              flex items-center justify-between
              px-4 py-2.5 text-sm
              text-gray-300 cursor-pointer
              hover:bg-slate-800/60
              transition
            "
          >
            {defaultFilter.value}
            {selected.value === defaultFilter.value && (
              <Check size={14} className="text-indigo-400" />
            )}
          </li>}

          {/* Options */}
          {filterData&&filterData.map((c) => {
            const active = selected.value === c.value;

            return (
              <li
                key={c._id}
                onClick={() => {
                  setSelected({_id:c._id,value:c.value});
                  setOpen(false);
                }}
                className={`
                  flex items-center justify-between
                  px-4 py-2.5 text-sm cursor-pointer
                  transition
                  ${
                    active
                      ? "bg-slate-800/70 text-white"
                      : "text-gray-300 hover:bg-slate-800/50"
                  }
                `}
              >
                {c.value}
                {active && (
                  <Check size={14} className="text-indigo-400" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Filter;
