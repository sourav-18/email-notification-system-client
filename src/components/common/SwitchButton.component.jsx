import { useRef, useState, useLayoutEffect } from "react";

const TABS = [
  { id: "history", label: "History" },
  { id: "queue", label: "Queue" },
];

export default function SwitchButton({ value, onChange }) {
  const containerRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[value];
    const parent = containerRef.current;
    if (!el || !parent) return;

    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    setIndicator({
      left: rect.left - parentRect.left,
      width: rect.width,
    });
  }, [value]);

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="relative inline-flex items-center rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-1"
      >
        {/* Sliding Indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-xl bg-indigo-500/25 transition-all duration-300 ease-out"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />

        {/* Tabs */}
        {TABS.map(tab => (
          <button
            key={tab.id}
            ref={el => (tabRefs.current[tab.id] = el)}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 px-5 py-2 text-sm rounded-xl transition-colors
              ${
                value === tab.id
                  ? "text-indigo-300"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
