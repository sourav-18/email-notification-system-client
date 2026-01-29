import { useState, useRef, useEffect } from "react";
import { BookOpen, Key, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { id: "/apiDocs", label: "API Docs", icon: BookOpen },
  { id: "/credentials", label: "Credentials", icon: Key },
  { id: "/notifications", label: "Notification History", icon: Bell },
];

export default function TopNavbar({ onChange }) {

  const [active, setActive] = useState(NAV_ITEMS[0].id);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const itemRefs = useRef({});

  const handleChange = (id) => {
    setActive(id);
    onChange?.(id);
  };

  useEffect(() => {
    const el = itemRefs.current[active];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setIndicator({ left: offsetLeft, width: offsetWidth });
    }
  }, [active]);

  return (
    <div className="h-24">
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
        {/* Indicator */}
        <div
          className="absolute top-2 bottom-2 rounded-xl bg-indigo-600/30 transition-all duration-300 ease-out"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />

        <div className="flex items-center">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <Link
                key={item.id}
                to={item.id}
                ref={(el) => (itemRefs.current[item.id] = el)}
                onClick={() => handleChange(item.id)}
                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
