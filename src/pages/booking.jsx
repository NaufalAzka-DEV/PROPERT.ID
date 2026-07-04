import { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import PremiumImage from '../components/PremiumImage';
import ScrollReveal from '../components/ScrollReveal';
import { useBuilding } from '../hooks/useBuildings';
import { createBooking } from '../services/api';

const packageOptions = ['Essential', 'Royal', 'Signature'];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { building, loading, error } = useBuilding(id);
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [packageName, setPackageName] = useState('Royal');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!building) return;

    setSubmitting(true);
    await createBooking({ building, date, note, packageName });
    setSubmitting(false);
    alert(`Booking ${building.nama} berhasil disimpan ke riwayat.`);
    navigate('/riwayat');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto h-[520px] max-w-5xl animate-pulse rounded-lg bg-white/[0.05]" />
      </div>
    );
  }

  if (error || !building) {
    return (
      <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
        <EmptyState
          title="Data booking tidak ditemukan"
          description="Silakan pilih gedung dari katalog sebelum membuat reservasi."
          action={
            <NavLink to="/gedung" className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f]">
              Pilih gedung
            </NavLink>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
          <PremiumImage src={building.image} alt={building.nama} wrapperClassName="h-72 w-full" className="h-full w-full object-cover" />
          <div className="p-6">
            <p className="text-xs font-semibold uppercase text-gold">{building.lokasi}</p>
            <h1 className="mt-2 font-playfair text-3xl font-semibold">{building.nama}</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">{building.deskripsi}</p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs text-slate-400">Harga</p>
              <p className="mt-1 text-xl font-bold text-gold">{building.harga}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 md:p-8">
          <p className="text-sm font-semibold uppercase text-gold">Simulasi Booking</p>
          <h2 className="mt-2 font-playfair text-3xl font-semibold">Amankan jadwal event</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Form ini menyimpan data ke localStorage sebagai dummy action, sehingga alurnya tetap bisa didemokan tanpa backend.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="tanggal" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                Tanggal event
              </label>
              <input
                id="tanggal"
                type="date"
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label htmlFor="paket" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                Paket layanan
              </label>
              <select
                id="paket"
                value={packageName}
                onChange={(event) => setPackageName(event.target.value)}
                className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition focus:border-gold"
              >
                {packageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="catatan" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                Catatan khusus
              </label>
              <textarea
                id="catatan"
                rows="4"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Contoh: butuh panggung tambahan dan meja registrasi."
                className="w-full resize-none rounded-md border border-white/10 bg-[#050b14] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-gold"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="min-h-12 w-full rounded-md bg-gold px-5 text-sm font-bold text-[#07111f] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 active:scale-[1.02]"
            >
              {submitting ? 'Menyimpan booking...' : 'Konfirmasi Booking'}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}
