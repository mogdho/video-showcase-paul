import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const ShowreelSection = () => {
  return (
    <section id="showreel" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl sm:text-6xl font-display text-gradient-gold text-center mb-4 tracking-wider">
            Showreel
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto">
            A highlight of my best work — all in one reel.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-secondary border border-border shadow-2xl"
        >
          {/* Placeholder — replace with embed when ready */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300 cursor-pointer">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Coming Soon</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
