import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const reels = [
  { id: 1, title: "Product Showcase Reel", desc: "Dynamic product reveal with motion graphics and energetic transitions" },
  { id: 2, title: "Behind the Scenes", desc: "Raw footage transformed into an engaging vertical story" },
  { id: 3, title: "Brand Awareness Reel", desc: "Quick-cut storytelling designed for maximum social media impact" },
  { id: 4, title: "Testimonial Reel", desc: "Client testimonials edited with cinematic flair and captions" },
];

const regularVideos = [
  { id: 1, title: "Cinematic Travel Edit", desc: "A visual journey through breathtaking landscapes with color grading and sound design" },
  { id: 2, title: "Brand Commercial", desc: "Professional ad spot with motion graphics, transitions and brand integration" },
  { id: 3, title: "Music Video Edit", desc: "Beat-synced cuts, visual effects and creative color treatment" },
  { id: 4, title: "Documentary Piece", desc: "Long-form storytelling with interviews, B-roll and narrative structure" },
  { id: 5, title: "Event Highlight", desc: "Fast-paced recap capturing the energy and key moments of live events" },
  { id: 6, title: "YouTube Video Edit", desc: "Engaging edits optimized for retention with graphics, zooms and effects" },
];

const VideoCard = ({ title, desc, aspect, index }: { title: string; desc: string; aspect: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <motion.div
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
      className={`group relative ${aspect} rounded-lg overflow-hidden bg-secondary border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <Play className="w-6 h-6 text-primary ml-0.5" />
        </div>
      </div>
    </motion.div>
    <div className="mt-3 px-1">
      <h3 className="text-sm font-display tracking-wider text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const VideoGrid = () => {
  return (
    <section id="work" className="relative py-24 px-6">
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

        {/* Reels Section */}
        <ScrollReveal>
          <h3 className="text-2xl font-display text-foreground mb-6 tracking-wider">Reels</h3>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-20">
          {reels.map((video, i) => (
            <VideoCard
              key={video.id}
              title={video.title}
              desc={video.desc}
              aspect="aspect-[9/16]"
              index={i}
            />
          ))}
        </div>

        {/* Regular Videos Section */}
        <ScrollReveal>
          <h3 className="text-2xl font-display text-foreground mb-6 tracking-wider">Videos</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularVideos.map((video, i) => (
            <VideoCard
              key={video.id}
              title={video.title}
              desc={video.desc}
              aspect="aspect-video"
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
