import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"show" | "out">("show");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("out");
      setTimeout(onComplete, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={phase === "out" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Clapperboard with clap animation */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Pulse ring behind */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-12px] rounded-full border border-primary/20"
          />

          <motion.div
            animate={{
              rotateZ: [0, -8, 8, -4, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
          >
            <Clapperboard className="w-14 h-14 text-primary" strokeWidth={1.5} />
          </motion.div>
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
  );
};

export default LoadingScreen;
