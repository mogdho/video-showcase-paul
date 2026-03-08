import { motion } from "framer-motion";
import { Film, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
        >
          <Film className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Video Editor</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-6xl sm:text-8xl lg:text-9xl font-display tracking-wider text-gradient-gold leading-none"
        >
          Mogdho Paul
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-md mx-auto font-light"
        >
          Engaging Video Editor — crafting stories that captivate and inspire.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          href="#work"
          className="mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 glow-gold"
        >
          View My Work
        </motion.a>
      </div>

      <a href="#work" className="absolute bottom-10 z-10 animate-bounce text-muted-foreground hover:text-primary transition-colors">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default HeroSection;
