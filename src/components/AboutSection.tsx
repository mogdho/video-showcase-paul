import { Clapperboard, Sparkles, Clock } from "lucide-react";

const stats = [
  { icon: Clapperboard, label: "Projects", value: "50+" },
  { icon: Sparkles, label: "Happy Clients", value: "30+" },
  { icon: Clock, label: "Hours Edited", value: "500+" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-6xl font-display text-gradient-gold text-center mb-4 tracking-wider">
          About Me
        </h2>

        <div className="mt-12 bg-card border border-border rounded-2xl p-8 sm:p-12">
          <p className="text-muted-foreground leading-relaxed text-center text-lg font-light">
            I'm <span className="text-primary font-medium">Mogdho Paul</span>, an aspiring video editor passionate about
            transforming raw footage into compelling visual stories. I specialize in cinematic edits,
            fast-paced reels, and brand content that grabs attention and holds it.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-display text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
