"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-t-purple-500 border-b-pink-500 border-l-transparent border-r-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
}
