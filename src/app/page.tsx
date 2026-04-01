"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Home() {
  const [stage, setStage] = useState<"error" | "reveal">("error");
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const moveButton = useCallback(() => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    setButtonPos({ x, y });
    setAttempts((prev) => prev + 1);
  }, []);

  const handleReveal = () => {
    setStage("reveal");
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
    });
  };

  useEffect(() => {
    if (attempts > 5) {
      // After 5 attempts, just let them click it or auto-reveal
      // For now, let's just make it easier to click or auto-reveal
    }
  }, [attempts]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden font-mono">
      <AnimatePresence mode="wait">
        {stage === "error" ? (
          <motion.div
            key="error-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-8 p-4 text-center"
          >
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl md:text-4xl font-bold text-red-500 uppercase tracking-widest">
              Critical System Failure
            </h1>
            <p className="text-zinc-400 max-w-md">
              A fatal exception 0xJDHA-CHOE has occurred at memory address 0000:4170.
              The current application will be terminated.
            </p>
            <div className="relative h-20 w-full flex items-center justify-center">
              <motion.button
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={attempts < 5 ? moveButton : undefined}
                onClick={handleReveal}
                className="bg-white text-black px-8 py-3 rounded-none font-bold hover:bg-zinc-200 transition-colors"
              >
                {attempts < 5 ? "REPAIR SYSTEM" : "CLICK TO FIX"}
              </motion.button>
            </div>
            {attempts > 0 && (
              <p className="text-zinc-600 text-sm italic">
                Repair attempts: {attempts}/5
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="reveal-screen"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.h1
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "0.2em", opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            >
              JDHA CHOE
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-xl text-zinc-400"
            >
              Happy April Fools! 🎉
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setStage("error")}
              className="mt-12 text-zinc-500 hover:text-white transition-colors text-sm underline"
            >
              Back to &quot;safety&quot;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
