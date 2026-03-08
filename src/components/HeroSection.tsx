import { motion } from "framer-motion";
import { Film, Search, Mic, ImageIcon } from "lucide-react";

const tags = [
  { icon: Film, label: "Video Editor" },
  { icon: Search, label: "YouTube SEO" },
  { icon: Mic, label: "Podcast Shorts Editor" },
  { icon: ImageIcon, label: "Thumbnail Designer AI" },
];
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
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-md bg-primary/10 blur-[40px] scale-110" />

            {/* Film frame */}
            <div className="relative bg-card rounded-md overflow-hidden border border-border shadow-2xl">
              {/* Top strip - film perforations */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-foreground/90">
                <div className="flex gap-1.5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`t-${i}`} className="w-2 h-3 rounded-sm bg-background/30" />
                  ))}
                </div>
              </div>

              {/* Photo */}
              <div className="relative">
                <img
                  src={mogdhoPhoto}
                  alt="Mogdho Paul"
                  className="w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-[22rem] object-cover"
                />
                {/* Film frame lines overlay */}
                <div className="absolute inset-0 border-x-[3px] border-foreground/10" />
                {/* Corner markers */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/60" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/60" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/60" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/60" />
              </div>

              {/* Bottom strip - film perforations */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-foreground/90">
                <div className="flex gap-1.5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`b-${i}`} className="w-2 h-3 rounded-sm bg-background/30" />
                  ))}
                </div>
                <span className="text-[9px] text-background/40 font-mono tracking-wider">FRAME 01</span>
              </div>
            </div>
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
