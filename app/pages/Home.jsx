"use client";
import { useEffect, useState } from "react";
import { PlusCircle, Trash2, Check, Moon, Sun } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
    <div className="flex gap-3">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 bg-purple-500 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
        />
      ))}
    </div>
  </div>
);

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true); // start as true
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const todo = {
    email,
    text: newTodo,
    completed: false,
  };

  // Fetch Todos
  const fetchTodo = async () => {
    try {
      const getRes = await axios.get(`/api/UserTodo/GetTodo/${email}`);
      if (getRes.data.status === 201) {
        setTodos(getRes.data.FindTodo.reverse());
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [email]);

  // Add Todo
  const handleAdd = async () => {
    if (!email) return;
    if (newTodo.trim() === "") return;

    setTodos([todo, ...todos]);
    setNewTodo("");

    try {
      const res = await axios.post("/api/UserTodo", todo);
      if (res.status === 201) {
        toast.success("Todo Added");
        fetchTodo();
      }
    } catch (err) {
      console.error(err);
      toast.error("Server issue, try again later");
    }
  };

  // Toggle Completion
  const handleToggle = async (id, completed) => {
    try {
      const res = await axios.patch(`/api/UserTodo/Update/${id}`, { completed: !completed });
      if (res.status === 201) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === id ? { ...todo, completed: !completed } : todo))
        );
        toast.success("Todo updated!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update todo");
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/UserTodo/Delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Todo Deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo");
    }
  };

  if (loading) return <Loader />; // show loader while fetching

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-500
        ${
          darkMode
            ? "bg-linear-to-br from-gray-900 via-purple-900 to-gray-800"
            : "bg-linear-to-br from-purple-100 via-pink-100 to-blue-100"
        }`}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl backdrop-blur-xl border shadow-2xl overflow-hidden transition-all duration-500
          ${darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/70 border-white/50"}`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-6 py-5
            ${
              darkMode
                ? "bg-linear-to-r from-purple-700 to-pink-600"
                : "bg-linear-to-r from-purple-500 to-pink-400"
            }`}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 animate-pulse">
            ToDo List <span>📋</span>
          </h1>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white text-sm sm:text-base font-semibold bg-white/20 hover:bg-white/30 rounded-xl px-3 py-1 transition-all"
                >
                  Sign In
                </motion.button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white/20 cursor-pointer hover:bg-white/30 p-2 rounded-xl transition-all"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Input Section */}
        <div className="p-6 flex gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className={`grow px-4 py-3 rounded-xl outline-none transition-all
              ${
                darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 shadow-sm"
              }`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="bg-linear-to-r cursor-pointer from-purple-600 to-pink-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md"
          >
            <PlusCircle className="w-5 h-5 inline mr-1" /> Add
          </motion.button>
        </div>

        {/* Task List */}
        <div className="px-6 pb-6 space-y-3 max-h-[55vh] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group
                    ${
                      darkMode
                        ? "bg-gray-700/60 hover:bg-gray-700/90"
                        : "bg-white/70 hover:bg-white/90 shadow-sm"
                    }`}
                >
                  <button
                    onClick={() => handleToggle(todo._id, todo.completed)}
                    className={`w-6 h-6 flex cursor-pointer items-center justify-center rounded-full border-2 transition-all transform hover:scale-110
                      ${
                        todo.completed
                          ? "bg-green-500 border-green-500"
                          : darkMode
                          ? "border-gray-500 hover:border-purple-400"
                          : "border-gray-300 hover:border-purple-400"
                      }`}
                  >
                    {todo.completed && <Check className="w-4 h-4 text-white animate-bounce" />}
                  </button>

                  <span
                    className={`grow mx-3 text-base transition-all duration-300
                      ${
                        todo.completed
                          ? darkMode
                            ? "text-gray-400 line-through"
                            : "text-gray-500 line-through"
                          : darkMode
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                  >
                    {todo.text}
                  </span>

                  <button
                    onClick={() => handleDelete(todo._id)}
                    className={`opacity-0 cursor-pointer group-hover:opacity-100 transition-all p-2 rounded-lg
                      ${
                        darkMode
                          ? "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                          : "text-gray-500 hover:text-red-500 hover:bg-red-100"
                      }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-sm py-6 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No tasks yet. Add something to get started ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          className={`text-center py-4 text-sm ${
            darkMode ? "text-gray-400 bg-gray-800/50" : "text-gray-600 bg-gray-50/80"
          }`}
        >
          Stay organized • Achieve more ✨
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? "rgba(147, 51, 234, 0.5)" : "rgba(147, 51, 234, 0.3)"};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? "rgba(147, 51, 234, 0.7)" : "rgba(147, 51, 234, 0.5)"};
        }
      `}</style>
    </main>
  );
}
