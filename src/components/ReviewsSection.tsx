import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import clientMewdreamer from "@/assets/client-mewdreamer.png";
import clientJoearias from "@/assets/client-joearias.png";
import clientElla from "@/assets/client-ella.png";
import clientElsie from "@/assets/client-elsie.png";

const reviews = [
  {
    name: "mewdreamer",
    role: "Content Creator, US",
    text: "Great job; fast turn around; fun quirky video made from a bunch of small snippet videos I recorded. Would definitely recommend!",
    stars: 4,
    avatar: clientMewdreamer,
  },
  {
    name: "joearias189",
    role: "Fitness Instructor & YouTuber",
    text: "Great seller, always responsive, I asked him to change something literally more than 10 times and he was so generous and professional! Definitely recommend him but just not too much otherwise he won't be available for my next job! lol",
    stars: 5,
    avatar: clientJoearias,
  },
  {
    name: "Ella Perez",
    role: "Nutrition Expert, Food Villa",
    text: "Fantastic - he was extremely responsive, helpful and fast! I will be calling on him for EVERY video need I have. Actually sending him another request now! :)",
    stars: 5,
    avatar: clientElla,
  },
  {
    name: "Elsie Ross",
    role: "Software Developer",
    text: "It was a pleasure working with Shah.",
    stars: 5,
    avatar: clientElsie,
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300"
  >
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{review.text}"</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover border border-border"
        />
        <div>
          <h4 className="text-sm font-display tracking-wider text-foreground blur-[3px] select-none hover:blur-none transition-all duration-300">{review.name}</h4>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < review.stars;
          const colorClass = review.stars === 5
            ? "text-green-500 fill-green-500"
            : "text-primary fill-primary";
          return (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${filled ? colorClass : "text-muted-foreground/30"}`}
            />
          );
        })}
      </div>
    </div>
  </motion.div>
);

const ReviewsSection = () => {
  return (
    <section id="reviews" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl sm:text-6xl font-display text-gradient-gold text-center mb-4 tracking-wider">
            Client Reviews
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
            What my clients have to say about working with me.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
