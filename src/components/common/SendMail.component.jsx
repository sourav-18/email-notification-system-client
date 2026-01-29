import { X, Send } from "lucide-react";
import Filter from "./Filter.component";
import { useEffect, useState } from "react";
import organizationApi from '../../services/organization.service';
import notificationApi from '../../services/notification.service';
import { AllState } from "../../context/Context";
import constantData from "../../utils/constant.util";

export default function SendMailModal({ open, onClose }) {

    const [credentialData, setCredentialData] = useState([]);
    const [credential, setCredential] = useState({});
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const { dispatch } = AllState();

    function sendAlert(message, status = "error") {
        dispatch({
            type: constantData.reducerActionType.alertMessageSet,
            payload: { message: message, status: status }
        });
    }

    async function handleSendEmail() {

        if (!credential || !to || !subject || !body) {
            return sendAlert("All field is required")
        }
        const sendData = {
            organizationCredentialId: credential._id,
            to: to,
            subject: subject,
            text: body
        }

        const apiRes = await notificationApi.sendImmediateNotification(sendData);
        sendAlert(apiRes.message, apiRes.status);
        if (apiRes.status === "success") {
            onClose()
        }

    }


    async function loadCredential() {
        const apiRes = await organizationApi.getCredentialForFilter();
        if (apiRes.status === "success") {
            setCredentialData(apiRes.data)
        }
    }

    useEffect(() => {
        loadCredential();
    }, [])

    if (!open) return;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3">
            <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[75vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <h2 className="text-sm font-semibold text-white">Send Email</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <div
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm"
                >
                    {/* From */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">From</label>
                        <Filter filterData={credentialData} selected={credential} width="w-full"
                            setSelected={setCredential} defaultFilter={null} />
                        {/* <select
              name="from"
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {fromOptions.map(opt => (
                <option key={opt._id} value={opt._id} className="bg-slate-900">
                  {opt.name}
                </option>
              ))}
            </select> */}
                    </div>

                    {/* To */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">To</label>
                        <input
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            name="to"
                            type="email"
                            placeholder="receiver@email.com"
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Subject</label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            name="subject"
                            type="text"
                            placeholder="Email subject"
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Body */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Message</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            name="body"
                            rows={5}
                            placeholder="Write your message here..."
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/10 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-xs text-gray-300 hover:bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSendEmail()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition"
                    >
                        <Send size={14} /> Send
                    </button>
                </div>
            </div>
        </div>
    );
}
