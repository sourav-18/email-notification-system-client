
export default function Search({
  search,
  setSearch,
  placeholder
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10
                   text-white placeholder:text-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>
  );
}
