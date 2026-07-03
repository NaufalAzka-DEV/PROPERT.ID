import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-[#0b132b] text-white min-h-screen">
      {/* Hero Section dengan Background Gedung Megah */}
      <div 
        className="relative bg-cover bg-center h-[550px] flex items-center"
        style={{ backgroundImage: `linear-gradient(to right, rgba(11,19,43,0.95), rgba(11,19,43,0.6)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200')` }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 w-full z-10">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight max-w-2xl">
            Temukan Gedung <span className="text-[#c5a880] font-semibold">Premium</span> untuk Event Anda
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-8 max-w-xl leading-relaxed">
            Platform terbaik untuk mencari dan menyewa gedung mewah, modern, dan eksklusif dengan proses cepat, transparan, dan terpercaya.
          </p>
          <div className="flex flex-wrap gap-4">
            <NavLink to="/gedung" className="bg-[#c5a880] hover:bg-[#b3956d] text-[#0b132b] font-bold px-6 py-3 rounded text-sm transition">
              Cari Gedung Sekarang
            </NavLink>
            <NavLink to="/masuk" className="border border-gray-500 hover:border-white text-white font-medium px-6 py-3 rounded text-sm transition bg-black/20">
              Login ke Akun
            </NavLink>
          </div>
        </div>
      </div>

      {/* Papan Statistik Bottom Row */}
      <div className="bg-[#0b132b] border-t border-gray-900 py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#c5a880]">250+</h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Gedung Tersedia</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#c5a880]">12K+</h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Booking Sukses</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#c5a880]">48</h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Kota di Indonesia</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#c5a880]">4.9★</h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Rating Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}