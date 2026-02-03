import { useState, useRef, useEffect } from "react";
import { Building,BookOpen, Key, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ORGANIZATION_NAV_ITEMS = [
  { id: "/apiDocs", label: "API Docs", icon: BookOpen },
  { id: "/", label: "Credentials", icon: Key },
  { id: "/notifications", label: "Notification History", icon: Bell },
];


const ADMIN_NAV_ITEMS = [
  { id: "/admin/organizations", label: "Organization", icon: Building },
  { id: "/admin/credentials", label: "Credentials", icon: Key },
  { id: "/admin/notifications", label: "Notification History", icon: Bell },
];

export default function TopNavbar({ onChange }) {
  const [NAV_ITEMS,setNav_ITEMS]=useState(ORGANIZATION_NAV_ITEMS);
  const location = useLocation()
  const [active, setActive] = useState(NAV_ITEMS[0].id);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const itemRefs = useRef({});

  useEffect(()=>{
      setActive(location.pathname)
      if(location.pathname.includes("/admin")){
        setNav_ITEMS(ADMIN_NAV_ITEMS);
      }
  },[location])

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

  if(location.pathname.includes("/login")||location.pathname.includes("/signup"))return;

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
