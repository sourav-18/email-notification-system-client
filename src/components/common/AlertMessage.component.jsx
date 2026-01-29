import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { AllState } from "../../context/Context";
import constantData from "../../utils/constant.util";

export default function AlertMessage({
}) {
  const { state: { alertMessage },dispatch } = AllState();

  if (!alertMessage) return null;

  function onClose() {
     dispatch({
      type: constantData.reducerActionType.alertMessageSet,
      payload: null
    });
  }

  const timer = setTimeout(() => {
    onClose();
    clearTimeout(timer);
  }, 4000);



  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
      <div
        className={`flex items-start gap-3 w-full max-w-md px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border animate-slide-down ${alertMessage.status == "success"
          ? "bg-green-500/20 border-green-400/30 text-green-100"
          : alertMessage.status == "error"
            ? "bg-red-500/20 border-red-400/30 text-red-100"
            : "bg-slate-500/20 border-slate-400/30 text-white"
          }`}
      >
        {alertMessage.status == "success" && <CheckCircle size={20} className="text-green-400 mt-0.5" />}
        {alertMessage.status == "error" && <XCircle size={20} className="text-red-400 mt-0.5" />}

        <p className="text-sm flex-1">{alertMessage.message}</p>

        <button onClick={onClose} className="opacity-70 hover:opacity-100">
          <X size={16} />
        </button>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
