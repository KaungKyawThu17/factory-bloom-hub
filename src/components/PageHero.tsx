export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 bg-gradient-glow opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-20 md:py-28">
        <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">{eyebrow}</div>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-6 text-lg text-white/80 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
