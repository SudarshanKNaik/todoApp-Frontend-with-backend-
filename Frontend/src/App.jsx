import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState, useEffect } from "react";
import { addItemToServer, getAllItemsFromServer, deleteItemFromServer, markItemCompletedOnServer } from "./services/itemService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getAllItemsFromServer().then((InitialItems) => {
      setTodoItems(InitialItems);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    const item = await addItemToServer(itemName, itemDueDate);
    if (!item) return; // ✅ don’t add null
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    setTodoItems([...todoItems, item]);
  };

  const handleDeleteItem = async (id) => {
    const deletedItem = await deleteItemFromServer(id);
    if (!deletedItem) return;
    setTodoItems(todoItems.filter((item) => item.id !== deletedItem.id));
  };

  const handleCompleteItem = async (id) => {
    const updated = await markItemCompletedOnServer(id);
    if (!updated) return;
    setTodoItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
        <div className="mb-8">
          <AppName />
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-white/10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-cyan-400/5 to-transparent" />
          <div className="relative p-6 sm:p-8">
            <div className="mt-6">
              <AddTodo onNewItem={handleNewItem} />
            </div>
            {todoItems.length === 0 && (
              <div className="mt-8">
                <WelcomeMessage />
              </div>
            )}
            <div className="mt-4 sm:mt-6">
              <section>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Active</h2>
                <TodoItems
                  todoItems={todoItems.filter((t) => !t.completed)}
                  onDeleteClick={handleDeleteItem}
                  onCompleteClick={handleCompleteItem}
                />
              </section>
              {todoItems.some((t) => t.completed) && (
                <section className="mt-8">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Completed</h2>
                  <TodoItems
                    todoItems={todoItems.filter((t) => t.completed)}
                    onDeleteClick={handleDeleteItem}
                    onCompleteClick={handleCompleteItem}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
