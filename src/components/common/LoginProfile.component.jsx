import React, { useState, useRef, useEffect } from 'react';
import { Building2, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import profileLogo from "../../assets/profile.jpg"
import { Link } from 'react-router-dom';

export default function LoginProfile ({ userImage = profileLogo }){

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const items = [
    { label: "Organization", icon: Building2, color: "text-cyan-400", glow: "group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]", link: "/login" },
    { label: "Administrator", icon: ShieldCheck, color: "text-purple-400", glow: "group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]", link: "/admin/login" },
  ];

  return (
    <div className="fixed top-8 right-8 z-[90]" ref={menuRef}>
      <div className="flex flex-col items-end">

        {/* TRIGGER: The "Liquid Lens" Avatar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-[2px] rounded-full transition-all duration-500 active:scale-90"
        >
          {/* Subtle Ambient Glow behind the button */}
          <div className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-xl transition-opacity duration-700 ${isOpen ? 'opacity-100 scale-125' : 'opacity-0'}`} />

          {/* The Outer Rim */}
          <div className={`relative p-[2px] rounded-full bg-gradient-to-b from-white/20 to-transparent transition-all duration-500 ${isOpen ? 'rotate-180' : ''}`}>
            {/* The Image Container */}
            <div className="relative rounded-full p-[1px]  shadow-2xl">
              <img
                src={userImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-white/5 group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </button>

        {/* MENU: The "Monolith" Slab */}
        {isOpen && (
          <div className="absolute top-16 right-0 w-56 origin-top-right">
            <div className="relative bg-[#080809] border border-white/10 rounded-[28px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">

              {/* Internal Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

              {/* User Identity Section */}
              <div className="px-6 py-5 border-b border-white/[0.05]">
                <div className="flex items-center justify-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <h3 className="text-[14px] font-bold text-white text-center tracking-tight uppercase">Login In With</h3>
                </div>
              </div>

              {/* Action Stack */}
              <div className="p-2 space-y-1">
                {items.map((item, idx) => (
                  <Link
                    to={item.link}
                    key={idx}
                    className="w-full flex items-center justify-between p-3 rounded-[20px] transition-all duration-300 group hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-4">
                      {/* Premium Icon Socket */}
                      <div className={`p-2.5 rounded-xl bg-black border border-white/5 transition-all duration-300 ${item.color} ${item.glow}`}>
                        <item.icon size={15} strokeWidth={2.5} />
                      </div>
                      <span className="text-[12px] font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-wide">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight size={12} className="text-slate-800 group-hover:text-white transition-all group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>

              {/* Stealth Footer */}
              <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-50" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
