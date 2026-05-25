import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type ServiceHeroSlide = {
  src: string;
  width: number;
  height: number;
};

type ServiceMediaHeroProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  slides: ServiceHeroSlide[];
  chips?: string[];
};

export function ServiceMediaHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  slides,
  chips = [],
}: ServiceMediaHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(id);
  }, [prefersReducedMotion, slides.length]);

  const activeSlide = slides[prefersReducedMotion ? 0 : activeIndex] ?? slides[0];

  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden bg-foreground text-white">
      {activeSlide && (
        <img
          key={activeSlide.src}
          src={activeSlide.src}
          alt=""
          aria-hidden="true"
          width={activeSlide.width}
          height={activeSlide.height}
          sizes="100vw"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover motion-safe:animate-fade-in"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
      <div className="absolute inset-0 bg-gradient-glow opacity-45" />
      <div className="absolute right-0 top-0 bottom-0 hidden w-1/3 translate-x-20 skew-x-[-12deg] bg-white/5 md:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-sm">
          {eyebrow}
        </div>
        <h1 className="font-display max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl">
          {title}{" "}
          <span className="bg-gradient-to-r from-accent to-cyan-200 bg-clip-text text-transparent">
            {highlight}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/86 md:text-xl">
          {subtitle}
        </p>

        {chips.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
