import { motion } from "framer-motion";
import { Film, Search, Mic, ImageIcon, ChevronDown, MapPin, Clapperboard, Sparkles, Clock } from "lucide-react";
import mogdhoPhoto from "@/assets/mogdho-photo.png";

const tags = [
  { icon: Film, label: "Video Editor" },
  { icon: Search, label: "YouTube SEO" },
  { icon: Mic, label: "Podcast Shorts Editor" },
  { icon: ImageIcon, label: "Thumbnail Designer AI" },
];

const stats = [
  { icon: Clapperboard, label: "Projects", value: "50+" },
  { icon: Sparkles, label: "Happy Clients", value: "30+" },
  { icon: Clock, label: "Hours Edited", value: "500+" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl mx-auto text-center">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-[30px] scale-125" />
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-primary/30 shadow-xl">
            <img
              src={mogdhoPhoto}
              alt="Mogdho Paul"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl sm:text-7xl font-display tracking-wider text-gradient-gold leading-none"
        >
          Mogdho Paul
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-3 text-lg sm:text-xl text-muted-foreground font-light"
        >
          Engaging Video Editor & YouTube SEO Specialist
        </motion.p>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border bg-card/50"
        >
          <MapPin className="w-3.5 h-3.5 text-green-500" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide">Worldwide</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-8 text-muted-foreground leading-relaxed max-w-lg text-base font-light"
        >
          I'm a passionate video editor specializing in cinematic edits,
          fast-paced reels, and brand content that grabs attention and holds it.
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {tags.map((tag, i) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 + i * 0.08 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5"
            >
              <tag.icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">{tag.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10 w-full bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-display text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
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
