import { motion } from "framer-motion";
import { Film, ChevronDown } from "lucide-react";
import mogdhoPhoto from "@/assets/mogdho-photo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-6 max-w-6xl mx-auto">
        {/* Text content */}
        <div className="text-center lg:text-left flex-1">
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
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-md font-light lg:mx-0 mx-auto"
          >
            Engaging Video Editor — crafting stories that captivate and inspire.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px hsl(40 85% 55% / 0.5)" }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 glow-gold"
          >
            View My Work
          </motion.a>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            {/* Glow behind photo */}
            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-[40px] scale-110" />
            <img
              src={mogdhoPhoto}
              alt="Mogdho Paul"
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl object-cover border-2 border-primary/20 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      <a href="#work" className="absolute bottom-10 z-10 animate-bounce text-muted-foreground hover:text-primary transition-colors">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default HeroSection;
