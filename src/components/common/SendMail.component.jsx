import { X, Send } from "lucide-react";
import Filter from "./Filter.component";
import { useEffect, useState } from "react";
import organizationApi from "../../services/organization.service";
import notificationApi from "../../services/notification.service";
import { AllState } from "../../context/Context";
import constantData from "../../utils/constant.util";
import DateTimePicker from "./DateTimePicker.component";

export default function SendMailModal({ open, onClose }) {
    const [credentialData, setCredentialData] = useState([]);
    const [credential, setCredential] = useState({});
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [schedule, setSchedule] = useState({ date: "", time: "" });
    const [mode, setMode] = useState("immediate");

    const { dispatch } = AllState();

    function sendAlert(message, status = "error") {
        dispatch({
            type: constantData.reducerActionType.alertMessageSet,
            payload: { message, status },
        });
    }

    async function handleSendEmail() {
        console.log(schedule)
        if (!credential || !to || !subject || !body) {
            return sendAlert("All field is required");
        }

        const sendData = {
            organizationCredentialId: credential._id,
            to,
            subject,
            priority:constantData.sendMail.priority.immediate,
            text: body,
        };

        if (mode === "schedule") {
            if (!schedule.date || !schedule.time) {
                return sendAlert("Date and Time is required for schedule mail");
            }else{
                sendData.priority=constantData.sendMail.priority.schedule
                sendData.scheduleTime=schedule.date+" "+schedule.time;
            }
        }



        const apiRes = await notificationApi.sendNotification(sendData);
        sendAlert(apiRes.message, apiRes.status);
        if (apiRes.status === "success") onClose();
    }

    async function loadCredential() {
        const apiRes = await organizationApi.getCredentialForFilter();
        if (apiRes.status === "success") setCredentialData(apiRes.data);
    }

    useEffect(() => {
        loadCredential();
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3">
            <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <h2 className="text-sm font-semibold text-white">Send Email</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                {/* Content (NO BIG SCREEN SCROLL) */}
                <div className="px-4 py-4 space-y-3 text-sm">

                    {/* Toggle */}
                    <div className="flex justify-center">
                        <div className="relative inline-flex rounded-xl bg-black/30 border border-white/10 p-1">
                            <div
                                className="absolute top-1 bottom-1 rounded-lg bg-indigo-500/25 transition-all duration-300"
                                style={{
                                    width: "50%",
                                    transform:
                                        mode === "immediate"
                                            ? "translateX(0%)"
                                            : "translateX(93%)",
                                }}
                            />
                            <button
                                onClick={() => setMode("immediate")}
                                className={`relative z-10 px-4 py-1.5 text-xs rounded-lg transition ${mode === "immediate"
                                        ? "text-indigo-300"
                                        : "text-gray-400"
                                    }`}
                            >
                                Immediate
                            </button>
                            <button
                                onClick={() => setMode("schedule")}
                                className={`relative z-10 px-4 py-1.5 text-xs rounded-lg transition ${mode === "schedule"
                                        ? "text-indigo-300"
                                        : "text-gray-400"
                                    }`}
                            >
                                Schedule
                            </button>
                        </div>
                    </div>

                    {/* From */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">From</label>
                        <Filter
                            filterData={credentialData}
                            selected={credential}
                            width="w-full"
                            setSelected={setCredential}
                            defaultFilter={null}
                        />
                    </div>

                    {/* To */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">To</label>
                        <input
                            value={to}
                            onChange={e => setTo(e.target.value)}
                            type="email"
                            placeholder="receiver@email.com"
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Schedule (only small screens scroll) */}
                    {mode === "schedule" && (
                        <DateTimePicker
                            label="Send At"
                            value={schedule}
                            onChange={setSchedule}
                        />
                    )}

                    {/* Subject */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Subject</label>
                        <input
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            type="text"
                            placeholder="Email subject"
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Body */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Message</label>
                        <textarea
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            rows={4}
                            placeholder="Write your message here..."
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white resize-none focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/10 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs rounded-lg text-gray-300 hover:bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSendEmail}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30"
                    >
                        <Send size={14} /> Send
                    </button>
                </div>
            </div>
        </div>
    );
}