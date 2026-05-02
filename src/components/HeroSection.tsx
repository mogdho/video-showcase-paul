import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Clapperboard, Sparkles, Clock, FolderOpen, Users, Star, Award, TrendingUp, Eye, Heart, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import mogdhoPhoto from "@/assets/mogdho-photo.png";
import { parseHeroTags, tagIconMap, defaultHeroTags, type HeroTag } from "@/lib/heroTags";

const defaultStats = [
  { icon: "Clapperboard", label: "Projects", value: "50+" },
  { icon: "Sparkles", label: "Happy Clients", value: "30+" },
  { icon: "Clock", label: "Hours Edited", value: "500+" },
];

const iconMap: Record<string, LucideIcon> = {
  Clapperboard, Sparkles, Clock, FolderOpen, Users, Star, Award, TrendingUp, Eye, Heart
};

type SiteSettings = Record<string, string>;
type StatData = { icon: string; label: string; value: string };

const HeroSection = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    hero_name: "Mogdho Paul",
    hero_title: "Engaging Video Editor & YouTube SEO Specialist",
    hero_location: "Worldwide",
    hero_bio: "I'm a passionate video editor specializing in cinematic edits, fast-paced reels, and brand content that grabs attention and holds it.",
    profile_photo_url: "",
  });
  const [stats, setStats] = useState<StatData[]>(defaultStats);

  useEffect(() => {
    const fetchData = async () => {
      const [settingsRes, statsRes] = await Promise.all([
        supabase.from("site_settings").select("*"),
        supabase.from("stats").select("*").eq("section", "hero").order("sort_order"),
      ]);

      if (settingsRes.data && settingsRes.data.length > 0) {
        const settingsMap: SiteSettings = {};
        settingsRes.data.forEach((row) => {
          if (row.value) settingsMap[row.key] = row.value;
        });
        setSettings((prev) => ({ ...prev, ...settingsMap }));
      }

      if (statsRes.data && statsRes.data.length > 0) {
        setStats(statsRes.data.map((s) => ({
          icon: s.icon,
          label: s.label,
          value: s.value,
        })));
      }
    };
    fetchData();
  }, []);

  const profileImage = settings.profile_photo_url || mogdhoPhoto;

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
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
              src={profileImage}
              alt={settings.hero_name}
              loading="eager"
              decoding="async"
              fetchPriority="high"
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
          {settings.hero_name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-3 text-lg sm:text-xl text-muted-foreground font-light"
        >
          {settings.hero_title}
        </motion.p>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border bg-card/50"
        >
          <MapPin className="w-3.5 h-3.5 text-green-500" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide">{settings.hero_location}</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-8 text-muted-foreground leading-relaxed max-w-lg text-base font-light"
        >
          {settings.hero_bio}
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
            {stats.map((stat, i) => {
              const IconComponent = iconMap[stat.icon] || Clapperboard;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  className="text-center"
                >
                  <IconComponent className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-display text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

      <a href="#work" className="absolute bottom-10 z-10 animate-bounce text-primary drop-shadow-[0_0_10px_hsl(40_85%_55%/0.6)] hover:drop-shadow-[0_0_20px_hsl(40_85%_55%/0.8)] transition-all">
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
};

export default HeroSection;
