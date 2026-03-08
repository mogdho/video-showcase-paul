import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"show" | "out">("show");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("out");
      setTimeout(onComplete, 800);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "out" ? null : null}
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={phase === "out" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
      >
        <div className="relative flex flex-col items-center gap-6">
          {/* Subtle pulsing ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-20 h-20 rounded-full border border-primary/30 -m-2"
            />
            <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full border-t-2 border-r-2 border-primary/50"
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl sm:text-4xl tracking-widest text-gradient-gold">
              Mogdho Paul
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-sm text-muted-foreground mt-2 tracking-wide font-light"
            >
              Engaging Video Editor
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
