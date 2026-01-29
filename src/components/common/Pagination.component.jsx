export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300 disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-xs text-gray-400">
        Page {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(p => p + 1)}
        className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}