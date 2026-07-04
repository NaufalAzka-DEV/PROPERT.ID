import { NavLink } from 'react-router-dom';
import BuildingCard from '../components/BuildingCard';
import FeatureCard from '../components/FeatureCard';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useBuildings } from '../hooks/useBuildings';

const features = [
  {
    meta: 'Terverifikasi',
    title: 'Pilihan gedung sudah dikurasi',
    description: 'Semua venue yang ada di PROEPRT.ID sudah terverifikasi bangunannya.',
  },
  {
    meta: 'Cepat',
    title: 'Booking simulasi dalam satu alur',
    description: 'Pilih gedung, isi tanggal, tentukan paket, lalu transaksi langsung masuk ke history.',
  },
  {
    meta: 'Premium',
    title: 'Pengalaman visual lebih profesional',
    description: 'UI dark navy dan gold dibuat konsisten untuk memanjakan mata.',
  },
];

export default function Home() {
  const { buildings, loading } = useBuildings();
  const featuredBuildings = buildings.slice(0, 3);

  return (
    <div className="bg-[#07111f] text-white">
      <section
        className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden bg-cover bg-center px-5 py-20 lg:px-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(7,17,31,0.96) 0%, rgba(7,17,31,0.82) 48%, rgba(7,17,31,0.42) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600')",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07111f] to-transparent" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
          <ScrollReveal className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase text-gold">
              Marketplace Gedung Premium Indonesia
            </p>
            <h1 className="font-playfair text-5xl font-semibold leading-tight text-white md:text-7xl">
              PROPERT.ID
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
              Temukan gedung elegan untuk wedding, seminar, gala dinner, dan event korporasi dengan proses booking
              yang rapi, cepat, dan mudah.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NavLink
                to="/gedung"
                className="rounded-md bg-gold px-6 py-3 text-center text-sm font-bold text-[#07111f] shadow-lg shadow-gold/20 transition hover:-translate-y-0.5 hover:bg-white active:scale-[1.02]"
              >
                Cari Gedung Sekarang
              </NavLink>
              <NavLink
                to="/dashboard"
                className="rounded-md border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold active:scale-[1.02]"
              >
                Lihat Dashboard
              </NavLink>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <StatCard label="Gedung aktif" value="12+" helper="Pilihan venue premium dari berbagai kota besar." />
            <StatCard label="Rating rata-rata" value="4.8" helper="Skor dari katalog venue terbaik." />
            <StatCard label="Alur booking" value="3 langkah" helper="Pilih, isi tanggal, simpan ke riwayat." />
          </ScrollReveal>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Keunggulan"
            title="System booking yang super mudah"
            description="PROPERT.ID hadir dengan system booking yang mudah,dan terintegrasi"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index * 120} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Rekomendasi"
            title="Gedung pilihan untuk event besar"
            description="Temukan venue terbaik anda."
          />
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-96 animate-pulse rounded-lg bg-white/[0.05]" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {featuredBuildings.map((building) => (
                <ScrollReveal key={building.id}>
                  <BuildingCard building={building} />
                </ScrollReveal>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <NavLink
              to="/gedung"
              className="inline-flex rounded-md border border-gold/40 px-6 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-[#07111f] active:scale-[1.02]"
            >
              Lihat Semua Gedung
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
