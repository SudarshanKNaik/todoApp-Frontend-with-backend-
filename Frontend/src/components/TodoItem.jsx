function TodoItem({ id, todoName, todoDate, completed = false, onCompleteClick, onDeleteClick }) {
  return (
    <div className={`group relative overflow-hidden rounded-xl border p-4 shadow-sm transition hover:shadow-md ${completed ? "border-emerald-500/20 bg-emerald-500/5" : "border-white/10 bg-white/5"}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className={`font-medium tracking-tight ${completed ? "text-emerald-200/90 line-through" : "text-slate-100/90"}`}>{todoName}</p>
          {todoDate && (
            <span className={`mt-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${completed ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100/90" : "border-white/10 bg-white/5 text-slate-300/90"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${completed ? "bg-emerald-400/80" : "bg-emerald-400/80"}`} />
              Due: {todoDate}
            </span>
          )}
        </div>
        <div className="flex gap-2 sm:w-auto">
          {!completed && (
            <button
              type="button"
              onClick={() => onCompleteClick && onCompleteClick(id)}
              className="inline-flex items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-sm font-semibold text-emerald-100 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-500/20 hover:text-white hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-500/30 active:translate-y-0"
            >
              Complete
            </button>
          )}
          <button
            type="button"
            onClick={() => onDeleteClick(id)}
            className="inline-flex items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2 text-sm font-semibold text-red-100 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-500/20 hover:text-white hover:shadow-md focus:outline-none focus:ring-4 focus:ring-red-500/30 active:translate-y-0"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-8 h-24 translate-y-8 bg-gradient-to-t from-white/5 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
    </div>
  );
}

export default TodoItem;
