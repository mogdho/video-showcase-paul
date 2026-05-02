import { Film, Search, Mic, ImageIcon, Video, Sparkles, Star, Award, TrendingUp, Heart, Eye, Clapperboard, Palette, Camera, Music, Edit, Scissors, Wand2, Youtube, Instagram, type LucideIcon } from "lucide-react";

export const tagIconMap: Record<string, LucideIcon> = {
  Film, Search, Mic, ImageIcon, Video, Sparkles, Star, Award, TrendingUp,
  Heart, Eye, Clapperboard, Palette, Camera, Music, Edit, Scissors, Wand2,
  Youtube, Instagram,
};

export const tagIconNames = Object.keys(tagIconMap);

export type HeroTag = { icon: string; label: string };

export const defaultHeroTags: HeroTag[] = [
  { icon: "Film", label: "Video Editor" },
  { icon: "Search", label: "YouTube SEO" },
  { icon: "Mic", label: "Podcast Shorts Editor" },
  { icon: "ImageIcon", label: "Thumbnail Designer AI" },
];

export const parseHeroTags = (raw?: string | null): HeroTag[] => {
  if (!raw) return defaultHeroTags;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((t) => t && typeof t.label === "string")) {
      return parsed.map((t) => ({ icon: t.icon || "Sparkles", label: t.label }));
    }
  } catch {}
  return defaultHeroTags;
};
