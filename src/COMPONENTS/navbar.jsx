import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-[5%] h-16 bg-navy/95 backdrop-blur-md border-b border-gold/20 text-white">
      {/* LOGO */}
      <Link to="/" className="font-playfair text-white text-xl">
        PROPERT<span className="text-gold">.ID</span>
      </Link>

      {/* MENU NAVIGASI (Disesuaikan dengan Route App.jsx) */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-white/70 hover:text-gold text-sm transition-colors">Beranda</Link>
        <Link to="/gedung" className="text-white/70 hover:text-gold text-sm transition-colors">Gedung</Link>
        <Link to="/dashboard" className="text-white/70 hover:text-gold text-sm transition-colors">Dashboard</Link>
        <Link to="/riwayat" className="text-white/70 hover:text-gold text-sm transition-colors">Riwayat</Link>
      </div>

      {/* TOMBOL AUTENTIKASI (Disesuaikan dengan Route App.jsx) */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate("/masuk")}
          className="text-white/70 hover:text-white px-4 py-1.5 text-sm rounded-sm transition-colors"
        >
          Masuk
        </button>
        <button 
          onClick={() => navigate("/daftar")}
          className="border border-white/30 hover:border-gold hover:text-gold px-4 py-1.5 text-sm rounded-sm transition-colors"
        >
          Daftar
        </button>
      </div>
    </nav>
  );
}