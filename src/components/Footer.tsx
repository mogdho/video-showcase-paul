import { Facebook, Instagram, Twitter } from "lucide-react";

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

const Footer = () => {
  return (
    <footer id="contact" className="py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-display text-gradient-gold tracking-wider mb-4">
          Let's Work Together
        </h2>
        <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
          Got a project in mind? Reach out through any of my socials.
        </p>

        <div className="flex items-center justify-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-12 h-12 rounded-full border border-border bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <p className="mt-16 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mogdho Paul. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
