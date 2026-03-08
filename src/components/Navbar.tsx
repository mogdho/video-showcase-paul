import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const FINAL_TEXT = "MOGDHO PAUL";
const GLITCH_CHARS = "モグドポールアイウエオカキクケコサシスセソタチツテト";
const GLITCH_DURATION = 1200;
const GLITCH_INTERVAL = 40;

const GlitchName = () => {
  const [display, setDisplay] = useState("");
  const [glitching, setGlitching] = useState(true);
  const frameRef = useRef(0);

  useEffect(() => {
    const totalFrames = GLITCH_DURATION / GLITCH_INTERVAL;
    let timer: ReturnType<typeof setInterval>;

    timer = setInterval(() => {
      frameRef.current++;
      const progress = frameRef.current / totalFrames;

      if (progress >= 1) {
        setDisplay(FINAL_TEXT);
        setGlitching(false);
        clearInterval(timer);
        return;
      }

      // Progressively reveal real characters from left to right
      const revealedCount = Math.floor(progress * FINAL_TEXT.length);
      let result = "";
      for (let i = 0; i < FINAL_TEXT.length; i++) {
        if (i < revealedCount) {
          result += FINAL_TEXT[i];
        } else if (FINAL_TEXT[i] === " ") {
          result += " ";
        } else {
          result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }
      setDisplay(result);
    }, GLITCH_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <a href="#" className="font-display text-2xl sm:text-3xl tracking-widest leading-none relative">
      <span
        className={`text-gradient-gold inline-block ${glitching ? "animate-glitch-flicker" : ""}`}
      >
        {display}
      </span>
      {glitching && (
        <>
          <span className="absolute inset-0 text-gradient-gold opacity-50 translate-x-[2px] translate-y-[-1px] clip-glitch-top">
            {display}
          </span>
          <span className="absolute inset-0 text-gradient-gold opacity-30 translate-x-[-2px] translate-y-[1px] clip-glitch-bottom">
            {display}
          </span>
        </>
      )}
    </a>
  );
};

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
        <GlitchName />

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
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
