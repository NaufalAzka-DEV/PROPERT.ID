export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-lg border border-dashed border-gold/40 bg-gold/5 px-6 py-10 text-center">
      <h3 className="font-playfair text-2xl font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
