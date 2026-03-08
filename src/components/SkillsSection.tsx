import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import iconAe from "@/assets/icon-ae.png";
import iconPr from "@/assets/icon-pr.png";
import iconVidiq from "@/assets/icon-vidiq.png";
import iconPs from "@/assets/icon-ps.png";
import iconAi from "@/assets/icon-ai.png";

const defaultSkills = [
  { name: "After Effects", level: 95, tier: "Expert", icon: "ae", desc: "Motion graphics, visual effects & compositing" },
  { name: "Premiere Pro", level: 90, tier: "Expert", icon: "pr", desc: "Precision cuts, sound design & color grading" },
  { name: "vid IQ", level: 90, tier: "Expert", icon: "vidiq", desc: "YouTube SEO, analytics & keyword optimization" },
  { name: "Photoshop", level: 65, tier: "Moderate", icon: "ps", desc: "Custom elements, thumbnails & photo retouching" },
  { name: "Illustrator", level: 60, tier: "Moderate", icon: "ai", desc: "Vector graphics, icons & design elements" },
];

const iconMap: Record<string, string> = {
  ae: iconAe,
  pr: iconPr,
  vidiq: iconVidiq,
  ps: iconPs,
  ai: iconAi,
  Palette: iconAe,
  Video: iconPr,
  Layers: iconAe,
  Music: iconPr,
  Sparkles: iconAe,
  Wand2: iconAe,
  Camera: iconPs,
  Film: iconPr,
  Monitor: iconVidiq,
};

type SkillData = {
  name: string;
  level: number;
  tier: string;
  icon: string;
  desc: string;
};

const SkillsSection = () => {
  const [skills, setSkills] = useState<SkillData[]>(defaultSkills);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order");

      if (data && data.length > 0) {
        setSkills(data.map((s) => ({
          name: s.name,
          level: s.level,
          tier: s.tier,
          icon: s.icon.toLowerCase(),
          desc: s.description || "",
        })));
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl sm:text-6xl font-display text-gradient-gold text-center mb-4 tracking-wider">
            Skills & Tools
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
            The creative arsenal I use to bring ideas to life.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((skill, i) => {
            const iconSrc = iconMap[skill.icon] || iconAe;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={iconSrc}
                    alt={skill.name}
                    className="w-14 h-14 rounded-xl object-contain"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="font-display text-xl tracking-wider text-foreground">{skill.name}</h3>
                    <span className={`text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      skill.tier === "Expert" || skill.tier === "Master"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {skill.tier}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-3">{skill.desc}</p>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-gold-glow"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
