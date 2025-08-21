import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="What do you need to get done?"
            value={todoName}
            onChange={handleNameChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-400 shadow-inner outline-none transition focus:border-indigo-400/40 focus:ring-4 focus:ring-indigo-500/20"
          />
        </div>
        <div className="sm:w-48">
          <input
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-400 shadow-inner outline-none transition [color-scheme:dark] focus:border-indigo-400/40 focus:ring-4 focus:ring-indigo-500/20"
          />
        </div>
        <div className="sm:w-auto">
          <button
            type="button"
            onClick={handleAddButtonClicked}
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-900/30 transition hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 active:scale-[0.99]"
          >
            <span className="relative">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
