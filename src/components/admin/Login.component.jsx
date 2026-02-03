import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Building2, ChevronRight } from 'lucide-react';
import { AllState } from "../../context/Context";
import constantData from "../../utils/constant.util";
import { adminLogin } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { setUserDataInLocalStorage } from "../../utils/fun.util";

export default function LoginPage() {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = AllState();

  function sendAlert(message, status = "error") {
    dispatch({
      type: constantData.reducerActionType.alertMessageSet,
      payload: { message: message, status: status }
    });
  }
  const handleLogin = async () => {
    if (!email || !password) {
      sendAlert("email and password is required");
    }
    const apiRes = await adminLogin({ emailId: email, password: password });
    sendAlert(apiRes.message, apiRes.status);
    if (apiRes.status == "error") {
      return;
    }

    setUserDataInLocalStorage({
      token: apiRes.data.token,
      userType: constantData.userType.admin
    })
    dispatch({ type: constantData.reducerActionType.loadProfileData });
    navigation("/admin/organizations");
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-4 antialiased">
      {/* Micro-Container: Fixed width 340px for that 'Small' feel */}
      <div className="relative w-full max-w-[360px] bg-[#111827] border border-white/10 rounded-[15px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

        {/* Subtle Glow behind the icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-cyan-500/10 blur-[40px] rounded-full -z-10" />

        {/* Minimal Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/40 mb-3">
            <Building2 size={20} className="text-white" />
          </div>
          <h2 className="text-[17px] font-bold text-white tracking-tight">Login With Admin</h2>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={14} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={14} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2.5 pl-10 pr-10 text-[13px] text-white focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {/* Action Button - High Contrast */}
          <button
            type="submit"
            onClick={() => handleLogin()}
            className="w-full group mt-4 relative py-2.5 bg-cyan-700 text-white/85 text-[13px] font-bold rounded-xl hover:bg-cyan-600  transition-all active:scale-[0.97]"
          >
            <span className="flex items-center justify-center gap-1">
              Login <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </form>

        {/* Specular highlight at the bottom edge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
