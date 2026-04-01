"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function Home() {
  const [stage, setStage] = useState<"prank" | "reveal">("prank");
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {stage === "prank" ? (
          <motion.div
            key="prank-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-6 p-6 text-center max-w-lg"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-pink-500 animate-pulse">
              <Image
                src="https://s3.ap-south-1.amazonaws.com/cis.kuenselonline/Dorji-1.jpg"
                alt="Dorji Tshomo"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">
                LIVE
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Dorji Tshomo is live on TikTok!
              </h1>
              <p className="text-zinc-400 text-lg">
                Join the stream now to see what&apos;s happening.
              </p>
            </div>

            <div className="relative h-24 w-full flex items-center justify-center">
              <motion.button
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={attempts < 7 ? moveButton : undefined}
                onClick={handleReveal}
                className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform"
              >
                Open it on TikTok
              </motion.button>
            </div>

            {attempts > 0 && (
              <p className="text-zinc-500 text-sm italic">
                Connection attempts: {attempts}
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
              className="mt-8 text-xl text-zinc-400 font-mono"
            >
              Happy April Fools! 🎉
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => {
                setStage("prank");
                setAttempts(0);
                setButtonPos({ x: 0, y: 0 });
              }}
              className="mt-12 text-zinc-500 hover:text-white transition-colors text-sm underline font-mono"
            >
              Watch again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
