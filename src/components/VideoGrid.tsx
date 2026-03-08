import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Video = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  embed_url: string | null;
  thumbnail_url: string | null;
  sort_order: number;
};

// Fallback data when DB is empty
const fallbackReels = [
  { id: "f1", title: "Product Showcase Reel", description: "Dynamic product reveal with motion graphics and energetic transitions", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 0 },
  { id: "f2", title: "Behind the Scenes", description: "Raw footage transformed into an engaging vertical story", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 1 },
  { id: "f3", title: "Brand Awareness Reel", description: "Quick-cut storytelling designed for maximum social media impact", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 2 },
  { id: "f4", title: "Testimonial Reel", description: "Client testimonials edited with cinematic flair and captions", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 3 },
  { id: "f5", title: "Fitness Transformation", description: "High-energy workout montage with beat-synced cuts and bold text overlays", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 4 },
  { id: "f6", title: "Recipe Quick Edit", description: "Fast-paced cooking reel with smooth transitions and appetizing color grading", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 5 },
  { id: "f7", title: "Travel Highlights", description: "Stunning vertical travel clips with cinematic transitions and ambient audio", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 6 },
  { id: "f8", title: "Fashion Lookbook", description: "Stylish outfit transitions with creative reveals and trending audio sync", type: "reel", embed_url: null, thumbnail_url: null, sort_order: 7 },
];

const fallbackRegular = [
  { id: "r1", title: "Cinematic Travel Edit", description: "A visual journey through breathtaking landscapes with color grading and sound design", type: "regular", embed_url: null, thumbnail_url: null, sort_order: 0 },
  { id: "r2", title: "Brand Commercial", description: "Professional ad spot with motion graphics, transitions and brand integration", type: "regular", embed_url: null, thumbnail_url: null, sort_order: 1 },
  { id: "r3", title: "Music Video Edit", description: "Beat-synced cuts, visual effects and creative color treatment", type: "regular", embed_url: null, thumbnail_url: null, sort_order: 2 },
  { id: "r4", title: "Documentary Piece", description: "Long-form storytelling with interviews, B-roll and narrative structure", type: "regular", embed_url: null, thumbnail_url: null, sort_order: 3 },
  { id: "r5", title: "Event Highlight", description: "Fast-paced recap capturing the energy and key moments of live events", type: "regular", embed_url: null, thumbnail_url: null, sort_order: 4 },
  { id: "r6", title: "YouTube Video Edit", description: "Engaging edits optimized for retention with graphics, zooms and effects", type: "regular", embed_url: null, thumbnail_url: null, sort_order: 5 },
];

const getEmbedSrc = (url: string): string | null => {
  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  // Already an embed URL
  if (url.includes("embed") || url.includes("preview")) return url;
  return null;
};

const VideoCard = ({ video, aspect, index }: { video: Video; aspect: string; index: number }) => {
  const embedSrc = video.embed_url ? getEmbedSrc(video.embed_url) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`group relative ${aspect} rounded-lg overflow-hidden bg-secondary border border-border hover:border-primary/40 transition-all duration-500`}>
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary ml-0.5" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 px-1">
        <h3 className="text-sm font-display tracking-wider text-foreground">{video.title}</h3>
        {video.description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{video.description}</p>
        )}
      </div>
    </motion.div>
  );
};

const VideoGrid = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from("videos")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setVideos((data as Video[]) || []);
        setLoaded(true);
      });
  }, []);

  const reels = loaded && videos.filter((v) => v.type === "reel").length > 0
    ? videos.filter((v) => v.type === "reel")
    : fallbackReels;

  const regular = loaded && videos.filter((v) => v.type === "regular").length > 0
    ? videos.filter((v) => v.type === "regular")
    : fallbackRegular;

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
            <VideoCard key={video.id} video={video} aspect="aspect-[9/16]" index={i} />
          ))}
        </div>

        {/* Regular Videos Section */}
        <ScrollReveal>
          <h3 className="text-2xl font-display text-foreground mb-6 tracking-wider">Videos</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((video, i) => (
            <VideoCard key={video.id} video={video} aspect="aspect-video" index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
