import React from 'react';

export default function IconButton({
    Icon ,
    onClick,
    variant = "primary",
    className = ""}) {

    // Elite colors with high-contrast light backgrounds
  const variants = {
    // Electric Cyan
    primary: "bg-slate-800 border-slate-700 text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-700",
    // Vivid Rose
    danger: "bg-slate-800 border-slate-700 text-rose-500 hover:border-rose-500/50 hover:bg-slate-700",
    // Neutral
    ghost: "bg-slate-800 border-slate-700 text-white hover:border-white/20 hover:bg-slate-700"
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-center
        w-11 h-11 rounded-2xl
        border shadow-xl
        transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        active:scale-95
        ${variants[variant]}
        ${className}
      `}
    >
      {/* 1. Subtle Inner Rim Light (Top Edge) */}
      <div className="absolute inset-0 rounded-xl border-t border-white/10 pointer-events-none" />

      {/* 2. Content */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {Icon && <Icon size={22} strokeWidth={1.8} />}
      </div>

      {/* 3. Hover Bottom Glow Line */}
      <div className={`
        absolute bottom-0 left-1/2 -translate-x-1/2 
        w-0 h-[2px] rounded-full transition-all duration-300
        group-hover:w-6
        ${variant === 'primary' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : ''}
        ${variant === 'danger' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : ''}
        ${variant === 'ghost' ? 'bg-white' : ''}
      `} />
    </button>
  );
};

