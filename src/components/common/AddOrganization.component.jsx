import React, { useState } from 'react';
import { X, Mail, ShieldCheck, ALargeSmall, Bell, CheckCircle2, AlertCircle, PlusCircle, Eye, EyeOff } from 'lucide-react';
import { AllState } from '../../context/Context';
import constantData from '../../utils/constant.util';
import adminApi from '../../services/admin.service';

export default function AddOrganization({ isOpen, onClose, refresh, setRefresh}) {
    const [showSecret, setShowSecret] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = AllState();

    function sendAlert(message, status = "error") {
        dispatch({
            type: constantData.reducerActionType.alertMessageSet,
            payload: { message: message, status: status }
        });
    }

    async function handleAdd() {
        if (!name || !email || !password) {
            return sendAlert("All field is required")
        }

        const addData = {
            name: name,
            emailId: email,
            password: password,
        }

        const apiRes = await adminApi.organization.add(addData);
        sendAlert(apiRes.message, apiRes.status);
        if (apiRes.status == "success") {
            setRefresh(!refresh)
            onClose()
        }
    }

    return isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-md bg-[#0d1117]/95 border border-white/10 rounded-[24px] shadow-2xl overflow-hidden ring-1 ring-white/5">

                {/* Accent Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 blur-3xl" />

                <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                            <PlusCircle size={18} className="text-blue-500" />
                            New Organization
                        </h2>
                        <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 text-gray-500 hover:text-white transition-all">
                            <X size={16} />
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                        {/* Identity & Secret Row */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Name</label>
                                <div className="relative group">
                                    <ALargeSmall className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={14} />
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="John doe" className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={14} />
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="example@gamil.com" className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={14} />
                                    <input
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        type={showSecret ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2 pl-9 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all"
                                    />
                                    {/* Show/Hide Toggle Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowSecret(!showSecret)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors"
                                    >
                                        {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-xl bg-white/[0.03] border border-white/5  text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                                Cancel
                            </button>
                            <button onClick={() => handleAdd()} type="button" className="flex-[1] py-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 shadow-lg shadow-blue-600/10 transition-all active:scale-95">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
