import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { AllState } from "../../context/Context";
import constantData from "../../utils/constant.util";
import { adminLogin, organizationLogin } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigation=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = AllState();

  function sendAlert(message, status="error") {
    dispatch({
      type: constantData.reducerActionType.alertMessageSet,
      payload: { message: message, status: status }
    });
  }
  const handleLogin = async () => {
    if (!email || !password) {
      return sendAlert("email and password is required");
    }
    const apiRes=await organizationLogin({emailId:email,password:password});
    sendAlert(apiRes.message,apiRes.status);
    if(apiRes.status=="error"){
      return;
    }
    localStorage.setItem("token",apiRes.data.token);
    localStorage.setItem("secret-key",apiRes.data.secretKey);
    navigation("/");
  }
  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Login to continue to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <a href="#" className="text-indigo-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            onClick={() => handleLogin()}
            type="button"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{' '}
          <a href="#" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
