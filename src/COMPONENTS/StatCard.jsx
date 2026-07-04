export default function StatCard({ label, value, helper, onClick }) {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className="w-full rounded-lg border border-white/10 bg-white/[0.05] p-5 text-left shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold/10 active:scale-[1.02]"
    >
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-2 font-playfair text-3xl font-semibold text-gold">{value}</p>
      {helper && <p className="mt-3 text-xs leading-5 text-slate-300">{helper}</p>}
    </Wrapper>
  );
}
