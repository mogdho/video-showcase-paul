import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Mail, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import iconFacebook from "@/assets/icon-facebook.png";
import iconInstagram from "@/assets/icon-instagram.png";
import iconX from "@/assets/icon-x.png";

const quickLinks = [
  { label: "About Me", href: "#about" },
  { label: "Showreel", href: "#showreel" },
  { label: "Skills", href: "#skills" },
  { label: "My Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const defaultSocials = [
  { platform: "Facebook", icon: iconFacebook, url: "#" },
  { platform: "Instagram", icon: iconInstagram, url: "#" },
  { platform: "X", icon: iconX, url: "#" },
];

const platformIconMap: Record<string, string> = {
  Facebook: iconFacebook,
  Instagram: iconInstagram,
  X: iconX,
  Twitter: iconX,
};

type SocialLink = { platform: string; icon: string; url: string };

const Footer = () => {
  const [socials, setSocials] = useState<SocialLink[]>(defaultSocials);
  const [contactEmail, setContactEmail] = useState("mogdhapal@gmail.com");
  const [location, setLocation] = useState("Brahmanbaria, Bangladesh");

  useEffect(() => {
    const fetchData = async () => {
      const [linksRes, settingsRes] = await Promise.all([
        supabase.from("social_links").select("*").order("sort_order"),
        supabase.from("site_settings").select("*"),
      ]);

      if (linksRes.data && linksRes.data.length > 0) {
        setSocials(linksRes.data.map((l) => ({
          platform: l.platform,
          icon: platformIconMap[l.platform] || iconFacebook,
          url: l.url,
        })));
      }

      if (settingsRes.data) {
        settingsRes.data.forEach((s) => {
          if (s.key === "contact_email" && s.value) setContactEmail(s.value);
          if (s.key === "hero_location" && s.value) setLocation(s.value);
        });
      }
    };
    fetchData();
  }, []);

  return (
    <footer id="contact" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl font-display text-gradient-gold tracking-wider text-center mb-10">
            Let's Work Together
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
            {/* Quick Links */}
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Quick Links</h3>
            <div className="bg-secondary/50 rounded-xl overflow-hidden mb-8">
              {quickLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`flex items-center justify-between px-5 py-4 text-sm text-foreground hover:text-primary hover:bg-secondary transition-colors ${
                    i < quickLinks.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>

            {/* Contact */}
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Contact</h3>
            <div className="bg-secondary/50 rounded-xl overflow-hidden mb-8">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 px-5 py-4 text-sm text-foreground hover:text-primary transition-colors border-b border-border/50"
              >
                <Mail className="w-4 h-4 text-primary" />
                {contactEmail}
              </a>
              <div className="flex items-center gap-3 px-5 py-4 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {location}
              </div>
            </div>

            {/* Connect */}
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Connect</h3>
            <div className="grid grid-cols-3 gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                >
                  <img src={social.icon} alt={social.platform} className="w-5 h-5 object-contain" />
                  <span className="text-sm text-foreground">{social.platform}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mogdho Paul. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
