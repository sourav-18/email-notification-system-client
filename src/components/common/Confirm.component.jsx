import React from 'react';
import { AlertCircle } from 'lucide-react';

const Confirm = ({ isOpen, onClose, onConfirm, text = "Are you sure?" }) => {

  return isOpen&&(
    <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 antialiased">
      {/* 1. Deep Backdrop with high-end blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-[6px] transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* 2. The Modal Card */}
      <div className="relative w-full max-w-[300px] bg-[#0d1117]/80 border border-white/10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Subtle Inner Glow - the "Secret Sauce" of Premium UI */}
        <div className="absolute inset-[1px] rounded-[23px] border border-white/[0.05] pointer-events-none" />

        <div className="relative z-10 p-6">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertCircle size={20} className="text-red-500" />
            </div>
            
            <div className="text-center">
              <h3 className="text-[16px] font-semibold text-white tracking-tight">
                {text}
              </h3>
              {/* <p className="mt-1 text-[13px] text-gray-400/80 leading-relaxed">
                This will permanently remove access to this identity.
              </p> */}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-2 mt-6">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-[13px] font-medium text-gray-400 bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
            >
              Back
            </button>
            <button 
              onClick={onConfirm}
              className="flex-[1.5] py-2.5 rounded-xl text-[13px] font-bold text-white bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-300 active:scale-95"
            >
              Confirm
            </button>
          </div>
        </div>

        {/* The "High-DPI" Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>
    </div>
  );
};

export default Confirm;