// components/IdCell.jsx
import { Copy,Check } from "lucide-react";
import { useState } from "react";

export default function IdCell({ id }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex justify-center items-center gap-2 font-mono text-gray-400">
      <span>
        {id.slice(0, 6)}...{id.slice(-4)}
      </span>

      <button
        onClick={handleCopy}
        className="transition-opacity hover:opacity-100 opacity-70"
        title={copied ? "Copied" : "Copy ID"}
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}
