import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const placeholderVideos = [
  { id: 1, title: "Cinematic Travel Edit", category: "Travel" },
  { id: 2, title: "Brand Commercial", category: "Commercial" },
  { id: 3, title: "Music Video Edit", category: "Music" },
  { id: 4, title: "Social Media Reel", category: "Reels" },
  { id: 5, title: "Documentary Piece", category: "Documentary" },
  { id: 6, title: "Event Highlight", category: "Events" },
];

const VideoGrid = () => {
  return (
    <section id="work" className="relative py-24 px-6">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl sm:text-6xl font-display text-gradient-gold text-center mb-4 tracking-wider">
            My Work
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
            A curated selection of my best video editing projects.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="group relative aspect-video rounded-lg overflow-hidden bg-secondary border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-6 h-6 text-primary ml-0.5" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{video.category}</span>
                <h3 className="text-sm font-semibold text-foreground mt-1">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
