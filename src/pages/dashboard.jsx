import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import PremiumImage from '../components/PremiumImage';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { useBuildings } from '../hooks/useBuildings';

export default function Dashboard() {
  const [activePanel, setActivePanel] = useState('overview');
  const { user, isAuthenticated } = useAuth();
  const { buildings } = useBuildings();
  const { bookings, pendingBookings, loading: loadingBookings, approveBooking } = useBookings();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Silakan login untuk mengakses dashboard.');
      navigate('/masuk');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#07111f]" />;
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="left"
          eyebrow={isAdmin ? 'Dashboard Admin' : 'Dashboard Client'}
          title={`Selamat datang, ${user.name}`}
          description="Selamat menikmati marketplace kami"
        />

        <ScrollReveal className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row">
          {['overview', 'activity', 'support'].map((panel) => (
            <button
              key={panel}
              type="button"
              onClick={() => setActivePanel(panel)}
              className={`rounded-md px-5 py-3 text-sm font-bold transition active:scale-[1.02] ${
                activePanel === panel ? 'bg-gold text-[#07111f]' : 'border border-white/10 text-slate-300 hover:border-gold/50 hover:text-gold'
              }`}
            >
              {panel === 'overview' ? 'Overview' : panel === 'activity' ? 'Aktivitas' : 'Bantuan'}
            </button>
          ))}
        </ScrollReveal>

        {activePanel === 'overview' && (
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              label={isAdmin ? 'Total pendapatan' : 'Voucher aktif'}
              value={isAdmin ? '80 jt' : '5%'}
              helper={isAdmin ? 'Simulasi pendapatan dari transaksi demo.' : 'Kode demo: PROPERTIDUAS.'}
              onClick={() => alert(isAdmin ? 'Laporan pendapatan  dibuka.' : 'Voucher berhasil diklaim.')}
            />
            <StatCard
              label="Gedung aktif"
              value={String(buildings.length || 12)}
              helper="Klik untuk kembali ke katalog properti."
              onClick={() => navigate('/gedung')}
            />
            <StatCard
              label={isAdmin ? 'Permintaan baru' : 'Booking diproses'}
              value={isAdmin ? String(pendingBookings.length) : String(bookings.length)}
              helper={isAdmin ? 'Ada reservasi yang bisa disetujui.' : 'Cek status lengkap di halaman riwayat.'}
              onClick={() => setActivePanel('activity')}
            />
          </div>
        )}

        {activePanel === 'activity' && (
          <ScrollReveal className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <h2 className="font-playfair text-2xl font-semibold text-white">
              {isAdmin ? 'Persetujuan Reservasi' : 'Aktivitas Booking'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {isAdmin
                ? 'Admin membaca booking dari localStorage `bookingData` dan bisa menyetujui status secara langsung.'
                : 'Booking yang dibuat dari halaman gedung tersimpan otomatis dan bisa dicek melalui riwayat.'}
            </p>

            {loadingBookings ? (
              <div className="mt-6 h-44 animate-pulse rounded-lg bg-white/[0.05]" />
            ) : isAdmin && bookings.length === 0 ? (
              <div className="mt-6">
                <EmptyState
                  title="Belum ada booking masuk"
                  description="Coba login sebagai user, buat booking dari katalog, lalu kembali ke dashboard admin."
                  action={
                    <NavLink to="/gedung" className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f]">
                      Buka Katalog
                    </NavLink>
                  }
                />
              </div>
            ) : isAdmin ? (
              <div className="mt-6 grid gap-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="grid gap-4 rounded-lg border border-white/10 bg-[#050b14] p-4 md:grid-cols-[112px_1fr_auto] md:items-center"
                  >
                    <PremiumImage
                      src={booking.image}
                      alt={booking.gedung}
                      wrapperClassName="h-24 w-full md:w-28"
                      className="h-full w-full object-cover"
                      rounded
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase text-gold">{booking.id}</p>
                      <h3 className="mt-1 font-semibold text-white">{booking.gedung}</h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {booking.client} - {booking.tanggal} - {booking.paket}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">{booking.catatan}</p>
                    </div>
                    <div className="flex flex-col gap-3 md:items-end">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          booking.status === 'Disetujui'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-amber-400/15 text-amber-200'
                        }`}
                      >
                        {booking.status}
                      </span>
                      <button
                        type="button"
                        disabled={booking.status === 'Disetujui'}
                        onClick={async () => {
                          await approveBooking(booking.id);
                          alert('Booking berhasil disetujui.');
                        }}
                        className="rounded-md bg-emerald-500 px-5 py-3 text-sm font-bold text-[#04130d] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[1.02]"
                      >
                        {booking.status === 'Disetujui' ? 'Sudah Disetujui' : 'Setujui Booking'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-[#050b14] p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">Total booking Anda: {bookings.length}</p>
                  <p className="mt-1 text-sm text-slate-400">Lihat detail status booking di halaman riwayat.</p>
                </div>
                <NavLink
                  to="/riwayat"
                  className="rounded-md bg-gold px-5 py-3 text-center text-sm font-bold text-[#07111f] transition hover:bg-white active:scale-[1.02]"
                >
                  Lihat Riwayat
                </NavLink>
              </div>
            )}
          </ScrollReveal>
        )}

        {activePanel === 'support' && (
          <ScrollReveal className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h2 className="font-playfair text-2xl font-semibold text-white">Konsultan VIP</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Hubungi tim staff untuk layout panggung, rundown, dan rekomendasi paket venue.
              </p>
              <button
                type="button"
                onClick={() => alert('Hotline demo: +62 812-3456-7890')}
                className="mt-6 rounded-md border border-gold/40 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-[#07111f] active:scale-[1.02]"
              >
                Hubungi Hotline
              </button>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h2 className="font-playfair text-2xl font-semibold text-white">Profile Akun</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Edit profile anda
              </p>
              <NavLink
                to="/profile"
                className="mt-6 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f] transition hover:bg-white active:scale-[1.02]"
              >
                Buka Profile
              </NavLink>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
