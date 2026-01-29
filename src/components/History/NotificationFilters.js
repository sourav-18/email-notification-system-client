// components/NotificationFilters.jsx
import { ChevronDown } from "lucide-react";

export default function NotificationFilters({
  search,
  setSearch,
  credentialId,
  setCredentialId,
  credentials,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search email or subject..."
        className="px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10
                   text-white placeholder:text-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />

      {/* Credential Filter */}
      <div className="relative">
        <select
          value={credentialId}
          onChange={e => setCredentialId(e.target.value)}
          className="appearance-none px-4 py-2 pr-9 text-sm rounded-lg
                     bg-white/5 border border-white/10 text-white
                     hover:bg-white/10 transition
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
          <option value="">All Credentials</option>
          {credentials.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}
