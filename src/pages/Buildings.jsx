import { useState } from 'react';
import BuildingCard from '../components/BuildingCard';
import EmptyState from '../components/EmptyState';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import { useBuildings } from '../hooks/useBuildings';

export default function Buildings() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('Semua');
  const { filteredBuildings, locations, loading, error } = useBuildings({ search, location });

  const resetFilter = () => {
    setSearch('');
    setLocation('Semua');
  };

  return (
    <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Katalog Gedung"
          title="Eksplorasi venue terbaik"
          description="Temukan venue"
        />

        <ScrollReveal className="mb-10 grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[1fr_240px_auto]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama, lokasi, atau tipe gedung"
            className="min-h-12 rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-gold"
          />
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="min-h-12 rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition focus:border-gold"
          >
            {locations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={resetFilter}
            className="min-h-12 rounded-md border border-gold/40 px-5 text-sm font-bold text-gold transition hover:bg-gold hover:text-[#07111f] active:scale-[1.02]"
          >
            Reset
          </button>
        </ScrollReveal>

        {error && (
          <EmptyState
            title="Data belum bisa dimuat"
            description={error}
            action={
              <button type="button" onClick={resetFilter} className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f]">
                Muat ulang filter
              </button>
            }
          />
        )}

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-96 animate-pulse rounded-lg bg-white/[0.05]" />
            ))}
          </div>
        )}

        {!loading && filteredBuildings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredBuildings.map((building, index) => (
              <ScrollReveal key={building.id} delay={(index % 3) * 80}>
                <BuildingCard building={building} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {!loading && filteredBuildings.length === 0 && (
          <EmptyState
            title="Gedung tidak ditemukan"
            description="Coba hapus kata kunci atau pilih lokasi Semua untuk menampilkan seluruh katalog."
            action={
              <button type="button" onClick={resetFilter} className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f]">
                Tampilkan semua
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
