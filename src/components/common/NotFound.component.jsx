import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AllState } from "../../context/Context";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4 overflow-hidden">
      <div className="relative text-center">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Animated 404 */}
        <h1 className="relative text-[5rem] md:text-[7rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-float">
          404
        </h1>

        <p className="mt-4 text-lg text-gray-300 max-w-md mx-auto">
          The page you’re trying to reach has drifted into the void.
        </p>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/30 text-white font-semibold overflow-hidden transition-all duration-300"
          >
            {/* Sliding transparent background */}
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />

            <ArrowLeft size={18} className="relative z-10" />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>

        {/* Animation styles */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-14px); }
            100% { transform: translateY(0); }
          }
          .animate-float {
            animation: float 3.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
