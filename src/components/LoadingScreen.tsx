import { useState, useEffect } from "react";

const LINES = [
  { text: "Mogdho Paul", isName: true },
  { text: "Engaging Video Editor", isName: false },
  { text: "for you", isName: false },
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [displays, setDisplays] = useState(LINES.map(() => ""));
  const [phase, setPhase] = useState<"typing" | "fadeout">("typing");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let frame = 0;
    const totalChars = LINES.reduce((sum, l) => sum + l.text.length, 0);
    let charIndex = 0;

    const timer = setInterval(() => {
      frame++;
      charIndex++;

      // Type out all lines sequentially
      let remaining = charIndex;
      const newDisplays = LINES.map((line) => {
        if (remaining <= 0) return "";
        const show = Math.min(remaining, line.text.length);
        remaining -= show;
        return line.text.slice(0, show);
      });

      setDisplays(newDisplays);

      if (charIndex >= totalChars) {
        clearInterval(timer);
        setTimeout(() => {
          setPhase("fadeout");
          setOpacity(0);
          setTimeout(onComplete, 600);
        }, 500);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative z-10 text-center space-y-2">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={
              line.isName
                ? "font-display text-5xl sm:text-7xl tracking-widest text-gradient-gold"
                : "text-lg sm:text-xl text-muted-foreground font-light tracking-wide"
            }
          >
            {displays[i]}
            {/* Show cursor at the end of the currently typing line */}
            {phase === "typing" &&
              displays[i].length > 0 &&
              displays[i].length < line.text.length && (
                <span className="inline-block w-[2px] h-[1em] bg-primary animate-pulse ml-0.5 align-middle" />
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
