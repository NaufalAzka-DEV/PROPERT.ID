import { NavLink, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import PremiumImage from '../components/PremiumImage';
import ScrollReveal from '../components/ScrollReveal';
import { useBuilding } from '../hooks/useBuildings';

export default function BuildingDetail() {
  const { id } = useParams();
  const { building, loading, error } = useBuilding(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto h-[560px] max-w-6xl animate-pulse rounded-lg bg-white/[0.05]" />
      </div>
    );
  }

  if (error || !building) {
    return (
      <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-4xl">
          <EmptyState
            title="Gedung tidak ditemukan"
            description="Data gedung yang Anda cari belum tersedia di katalog demo."
            action={
              <NavLink to="/gedung" className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f]">
                Kembali ke katalog
              </NavLink>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="grid overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[360px]">
            <PremiumImage src={building.image} alt={building.nama} wrapperClassName="h-full min-h-[360px]" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>

          <div className="p-6 md:p-10">
            <NavLink to="/gedung" className="text-sm font-semibold text-gold transition hover:text-white">
              Kembali ke katalog
            </NavLink>
            <p className="mt-8 text-sm font-semibold uppercase text-gold">{building.lokasi}</p>
            <h1 className="mt-3 font-playfair text-4xl font-semibold leading-tight md:text-5xl">{building.nama}</h1>
            <p className="mt-5 text-sm leading-7 text-slate-300">{building.deskripsi}</p>

            <div className="mt-8 grid gap-5 border-y border-white/10 py-6 sm:grid-cols-3">
              <div className="border-l border-gold/50 pl-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Rating</p>
                <p className="mt-2 text-2xl font-bold text-gold">{building.rating.toFixed(1)}</p>
              </div>
              <div className="border-l border-gold/50 pl-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Kapasitas</p>
                <p className="mt-2 text-2xl font-bold text-gold">{building.kapasitas}</p>
              </div>
              <div className="border-l border-gold/50 pl-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Tipe</p>
                <p className="mt-2 text-2xl font-bold text-gold">{building.tipe}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase text-slate-400">Harga sewa</p>
              <p className="mt-2 text-2xl font-bold text-gold">{building.harga}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NavLink
                to={`/booking/${building.id}`}
                className="rounded-md bg-gold px-6 py-3 text-center text-sm font-bold text-[#07111f] transition hover:bg-white active:scale-[1.02]"
              >
                Lanjut ke Booking
              </NavLink>
              <button
                type="button"
                onClick={() => alert('Tim PROPERT.ID akan menghubungi Anda untuk simulasi survey lokasi.')}
                className="rounded-md border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:border-gold/50 hover:text-gold active:scale-[1.02]"
              >
                Jadwalkan Survey
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {building.fasilitas.map((facility, index) => (
            <ScrollReveal
              key={facility}
              delay={index * 80}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold text-slate-200"
            >
              {facility}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
