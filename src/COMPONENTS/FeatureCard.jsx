import ScrollReveal from './ScrollReveal';

export default function FeatureCard({ title, description, meta, delay = 0 }) {
  return (
    <ScrollReveal
      delay={delay}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold/10"
    >
      <p className="mb-4 text-xs font-semibold uppercase text-gold">{meta}</p>
      <h3 className="font-playfair text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
    </ScrollReveal>
  );
}
