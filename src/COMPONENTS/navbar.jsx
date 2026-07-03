import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkBase = ({ isActive }) => isActive ? "text-[#c5a880] font-semibold" : "text-gray-300 hover:text-white transition";

  return (
    <nav className="bg-[#0b132b] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <NavLink to="/" className="text-lg font-serif tracking-widest font-bold text-[#c5a880]">PROPERT.ID</NavLink>
      <div className="flex space-x-6 text-xs uppercase tracking-wider font-medium">
        <NavLink to="/" className={linkBase}>Beranda</NavLink>
        <NavLink to="/gedung" className={linkBase}>Gedung</NavLink>
        <NavLink to="/dashboard" className={linkBase}>Dashboard</NavLink>
        <NavLink to="/riwayat" className={linkBase}>Riwayat</NavLink>
      </div>
      <div className="flex space-x-3 items-center">
        <NavLink to="/masuk" className="text-xs text-gray-300 hover:text-white font-medium">Masuk</NavLink>
        <NavLink to="/daftar" className="bg-[#c5a880] text-[#0b132b] text-[11px] font-bold px-3 py-1.5 rounded transition hover:bg-[#b3956d]">Daftar</NavLink>
      </div>
    </nav>
  );
}