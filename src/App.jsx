import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './COMPONENTS/navbar'; 
import Footer from './COMPONENTS/footer';
import GedungPage from './pages/GedungPage'; 

// 1. DUMMY COMPONENT UNTUK PAGE LAIN (Bisa kamu isi/ganti nanti sesuai mockup-mu)
const BerandaPage = () => (
  <div className="bg-navy text-white py-20 px-[5%] text-center">
    <h1 className="font-playfair text-5xl md:text-6xl mb-4">Temukan Gedung <span className="text-gold">Premium</span> untuk Event Anda</h1>
    <p className="text-white/80 max-w-2xl mx-auto mb-8">Platform terbaik untuk mencari dan menyewa gedung mewah, modern, dan eksklusif.</p>
    <Link to="/gedung" className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 py-3 rounded transition-colors inline-block">
      Cari Gedung Sekarang
    </Link>
  </div>
);

const DashboardPage = () => <div className="p-12 text-center text-2xl font-bold text-navy">Halaman Dashboard (Under Construction)</div>;
const RiwayatPage = () => <div className="p-12 text-center text-2xl font-bold text-navy">Halaman Riwayat Pemesanan</div>;
const DetailGedungPage = () => <div className="p-12 text-center text-2xl font-bold text-navy">Halaman Detail Spesifikasi Gedung</div>;
const MasukPage = () => <div className="p-12 text-center text-2xl font-bold text-navy">Halaman Login Akun</div>;
const DaftarPage = () => <div className="p-12 text-center text-2xl font-bold text-navy">Halaman Registrasi Pengguna</div>;

function App() {
  return (
    <div className="bg-cream min-h-screen font-sans flex flex-col justify-between">
      
      {/* NAVBAR DI ATAS SELALU MUNCUL DI TIAP PAGE */}
      <Navbar />

      {/* SISTEM MULTI-PAGE (Mendukung 4 - 7 Halaman Sesuai Permintaan Dosen) */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<BerandaPage />} />
          <Route path="/gedung" element={<GedungPage />} />
          <Route path="/venues" element={<GedungPage />} /> {/* Jalur fallback */}
          <Route path="/venues/:id" element={<DetailGedungPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/riwayat" element={<RiwayatPage />} />
          <Route path="/masuk" element={<MasukPage />} />
          <Route path="/daftar" element={<DaftarPage />} />
        </Routes>
      </div>

      {/* FOOTER DI BAWAH SELALU MUNCUL */}
      <Footer />
    </div>
  );
}

export default App;