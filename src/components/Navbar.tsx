import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-2xl sm:text-3xl tracking-widest text-gradient-gold leading-none">
          MOGDHO PAUL
        </a>

        <div className="hidden sm:flex items-center gap-8">
          {links.filter(l => l.label !== "Contact").map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm uppercase tracking-wider font-semibold px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            Contact
          </a>
        </div>

        <button
          className="sm:hidden text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-background/95 backdrop-blur-lg border-b border-border px-6 pb-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
