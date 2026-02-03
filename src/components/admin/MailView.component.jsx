import { X, CheckCircle, AlertCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import adminApi from '../../services/admin.service';


export default function MailViewModal({ onClose, id, switchButton }) {
  const [data, setData] = useState(null);


  async function loadData() {
    if (!id) {
      setData(null);
      return;
    }

    let apiRes = null;
    if (switchButton === "history") {
      apiRes = await adminApi.notification.historyDetailsById(id);
    } else {
      apiRes = await adminApi.notification.queuesDetailsById(id);
    }
    if (apiRes.status === "success") {
      setData(apiRes.data)
    }
  }
  useEffect(() => {
    loadData();
  }, [id])

  if (!data) return null;

  const statusConfig = {
    1: {
      label: "Idle",
      color: "bg-gray-400",
      text: "text-gray-300",
      icon: AlertCircle,
    },
    2: {
      label: "Processing",
      color: "bg-blue-400",
      text: "text-blue-300",
      icon: Loader2,
    },
    3: {
      label: "Error",
      color: "bg-red-400",
      text: "text-red-300",
      icon: AlertCircle,
    },
    4: {
      label: "Success",
      color: "bg-green-400",
      text: "text-green-300",
      icon: CheckCircle,
    },
    5: {
      label: "Failed",
      color: "bg-orange-400",
      text: "text-orange-300",
      icon: XCircle,
    },
    6: {
      label: "Cancel",
      color: "bg-gray-500/20",
      text: "text-white-300",
      icon: XCircle,
    }
  };

  const status = statusConfig[data.status];
  const StatusIcon = status.icon;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3" >
        <div className="w-full max-w-3xl max-h-[85vh] rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">

          {/* Preview color bar */}
          <div className={`h-1.5 w-full ${status.color}`} />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <StatusIcon size={16} className={status.text} />
              <h2 className="text-sm font-semibold text-white">
                Email Preview
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Meta info */}
          <div className="px-5 py-4 space-y-2 text-sm text-gray-300 border-b border-white/10">
            <div className="flex justify-between items-center gap-4">
              <span className="truncate">
                <span className="text-gray-400 font-bold">To:</span>{" "}
                {data.to}
                {/* <span className="text-gray-400 text-xs"> Form: {data.form}</span> */}

              </span>

              <span className={`text-xs font-medium ${status.text}`}>
                {status.label}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400">
              <span><span className="font-bold">from:</span> {data.from}</span>
              <span><span className="font-bold"> Attempts:</span> {data.attemptCount}</span>
              <span><span className="font-bold">EntryTime:</span> {data.entryTime?new Date(data.entryTime).toLocaleString():"--"}</span>
               <span>
                <span className="font-bold">
                  Queue Entry Time:{" "}
                </span>
                {data.queueEntryTime?new Date(data.queueEntryTime).toLocaleString():"--"}
              </span>

               <span>
                <span className="font-bold">
                  schedule Time:{" "}
                </span>
                {data.scheduleTime?new Date(data.scheduleTime).toLocaleString():"--"}
              </span>

               
                <span>
                  <span className="font-bold">
                    Success Time:{" "}
                  </span>
                  {data.successTime?new Date(data.successTime).toLocaleString():"--"}
                </span>
              
              <span> <span className="font-bold">Organization Name:</span> {data.organizationName}</span>
              <span><span className="font-bold"> Organization Email:</span> {data.organizationEmail}</span>
            </div>
          </div>

          {/* Subject */}
          <div className="px-5 py-3 border-b border-white/10">
            <p className="text-sm font-medium text-white">
              {data.subject}
            </p>
          </div>

          {/* Mail body (scrollable) */}
          <div className="px-5 py-4 text-sm text-gray-300 overflow-y-auto flex-1 leading-relaxed whitespace-pre-wrap">
            {data.text}
          </div>

          {/* Error message (only for error / failed) */}
          {(data.status === 3 || data.status === 5) &&
            data.emailErrorMessage && (
              <div className="px-5 py-3 border-t border-white/10 bg-red-500/5 text-xs text-red-300 overflow-y-auto max-h-32">
                {data.emailErrorMessage}
              </div>
            )}
        </div>
      </div >
    </>
  );
}
