import ScrollReveal from './ScrollReveal';

export default function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';

  return (
    <ScrollReveal className={`mb-10 flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-playfair text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{description}</p>}
    </ScrollReveal>
  );
}
