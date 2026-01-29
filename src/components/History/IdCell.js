// components/IdCell.jsx
import { Copy } from "lucide-react";

export default function IdCell({ id }) {
  const shortId = "1234"||"${id.slice(0, 6)}...${id.slice(-4)}";

  return (
    <div className="flex items-center gap-2 group">
      <span className="text-gray-400 font-mono text-sm">{shortId}</span>

      <button
        onClick={() => navigator.clipboard.writeText(id)}
        className="opacity-0 group-hover:opacity-100 transition"
        title="Copy ID"
      >
        <Copy size={14} className="text-gray-400 hover:text-indigo-400" />
      </button>
    </div>
  );
}
