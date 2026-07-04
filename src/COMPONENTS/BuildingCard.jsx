import { NavLink } from 'react-router-dom';
import PremiumImage from './PremiumImage';

export default function BuildingCard({ building }) {
  return (
    <NavLink
      to={`/gedung/${building.id}`}
      className="group premium-card block overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-gold/60 hover:shadow-gold/20 active:scale-[1.02]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <PremiumImage
          src={building.image}
          alt={building.nama}
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-[#07111f]/85 px-3 py-1 text-xs font-semibold text-gold ring-1 ring-gold/30">
          {building.tipe}
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#07111f]">
          {building.rating.toFixed(1)} / 5
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase text-gold">{building.lokasi}</p>
          <h3 className="mt-2 font-playfair text-xl font-semibold leading-snug text-white">{building.nama}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{building.deskripsi}</p>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-xs text-slate-400">Mulai dari</p>
            <p className="mt-1 text-sm font-bold text-gold">{building.harga}</p>
          </div>
          <span className="rounded-md bg-gold px-4 py-2 text-xs font-bold text-[#07111f] transition group-hover:bg-white">
            Detail
          </span>
        </div>
      </div>
    </NavLink>
  );
}
