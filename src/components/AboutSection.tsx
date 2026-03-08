import { useState, useEffect } from "react";
import { Clapperboard, Sparkles, Clock, FolderOpen, Users, Star, Award, TrendingUp, Eye, Heart, type LucideIcon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const defaultStats = [
  { icon: "Clapperboard", label: "Projects", value: "50+" },
  { icon: "Sparkles", label: "Happy Clients", value: "30+" },
  { icon: "Clock", label: "Hours Edited", value: "500+" },
];

const iconMap: Record<string, LucideIcon> = {
  Clapperboard, Sparkles, Clock, FolderOpen, Users, Star, Award, TrendingUp, Eye, Heart
};

type StatData = { icon: string; label: string; value: string };

const AboutSection = () => {
  const [stats, setStats] = useState<StatData[]>(defaultStats);
  const [aboutText, setAboutText] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [statsRes, settingsRes] = await Promise.all([
        supabase.from("stats").select("*").eq("section", "about").order("sort_order"),
        supabase.from("site_settings").select("*").eq("key", "about_text"),
      ]);

      if (statsRes.data && statsRes.data.length > 0) {
        setStats(statsRes.data.map((s) => ({
          icon: s.icon,
          label: s.label,
          value: s.value,
        })));
      }

      if (settingsRes.data && settingsRes.data.length > 0 && settingsRes.data[0].value) {
        setAboutText(settingsRes.data[0].value);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl sm:text-6xl font-display text-gradient-gold text-center mb-4 tracking-wider">
            About Me
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 bg-card border border-border rounded-2xl p-8 sm:p-12">
            <p className="text-muted-foreground leading-relaxed text-center text-lg font-light">
              {aboutText || (
                <>
                  I'm <span className="text-primary font-medium">Mogdho Paul</span>, an aspiring video editor passionate about
                  transforming raw footage into compelling visual stories. I specialize in cinematic edits,
                  fast-paced reels, and brand content that grabs attention and holds it.
                </>
              )}
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, i) => {
                const IconComponent = iconMap[stat.icon] || Clapperboard;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    className="text-center"
                  >
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-3" />
                    <div className="text-2xl sm:text-3xl font-display text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
