import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const getEmbedSrc = (url: string): string | null => {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  if (url.includes("embed") || url.includes("preview")) return url;
  return null;
};

const ShowreelSection = () => {
  const [url, setUrl] = useState("");
  const [thumb, setThumb] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("*")
      .in("key", ["showreel_url", "showreel_thumbnail_url"])
      .then(({ data }) => {
        if (data) {
          setUrl(data.find((r) => r.key === "showreel_url")?.value || "");
          setThumb(data.find((r) => r.key === "showreel_thumbnail_url")?.value || "");
        }
      });
  }, []);

  const embedSrc = url ? getEmbedSrc(url) : null;

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
          onClick={() => embedSrc && setOpen(true)}
          className={`relative aspect-video rounded-2xl overflow-hidden bg-secondary border border-border shadow-2xl group ${embedSrc ? "cursor-pointer" : ""}`}
        >
          {thumb ? (
            <img src={thumb} alt="Showreel" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card" />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
            {!embedSrc && (
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Coming Soon</p>
            )}
          </div>
        </motion.div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-border overflow-hidden">
          <div className="relative aspect-video w-full">
            {open && embedSrc && (
              <iframe
                src={embedSrc}
                title="Showreel"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ShowreelSection;
