import { useState, useEffect } from "react";

const GLITCH_CHARS = "モグドポールアイウエオカキクケコサシスセソ";
const LINES = [
  { text: "Mogdho Paul", isName: true },
  { text: "Engaging Video Editor", isName: false },
  { text: "for you", isName: false },
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [displays, setDisplays] = useState(LINES.map(() => ""));
  const [phase, setPhase] = useState<"glitch" | "reveal" | "fadeout">("glitch");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let frame = 0;
    const totalGlitchFrames = 20;
    const totalRevealFrames = 25;

    const timer = setInterval(() => {
      frame++;

      if (phase === "glitch") {
        // All lines glitch with Japanese chars
        setDisplays(
          LINES.map((line) =>
            line.text
              .split("")
              .map((ch) =>
                ch === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              )
              .join("")
          )
        );

        if (frame >= totalGlitchFrames) {
          frame = 0;
          setPhase("reveal");
        }
      } else if (phase === "reveal") {
        const progress = frame / totalRevealFrames;

        setDisplays(
          LINES.map((line) => {
            const revealed = Math.floor(progress * line.text.length);
            return line.text
              .split("")
              .map((ch, i) => {
                if (i < revealed) return ch;
                if (ch === " ") return " ";
                return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              })
              .join("");
          })
        );

        if (progress >= 1) {
          setDisplays(LINES.map((l) => l.text));
          clearInterval(timer);

          // Hold for a moment then fade out
          setTimeout(() => {
            setPhase("fadeout");
            setOpacity(0);
            setTimeout(onComplete, 600);
          }, 400);
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [phase, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Ambient glow */}
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
          </div>
        ))}

        {/* Underscore cursor */}
        <span className="inline-block w-3 h-[2px] bg-primary animate-pulse mt-4" />
      </div>
    </div>
  );
};

export default LoadingScreen;
