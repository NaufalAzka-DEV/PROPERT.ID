import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './COMPONENTS/footer'; // sesuaikan huruf besar-kecil folder lokalmu
import Home from './pages/home';
import Gedung from './pages/gedung';
import DetailGedung from './pages/DetailGedung';
import Booking from './pages/Booking'; // Import Baru
import Dashboard from './pages/dashboard';
import Riwayat from './pages/riwayat';
import Login from './pages/login';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#0b132b]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gedung" element={<Gedung />} />
            <Route path="/gedung/:id" element={<DetailGedung />} />
            <Route path="/booking/:id" element={<Booking />} /> {/* Route Baru */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/masuk" element={<Login />} />
            <Route path="/daftar" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}