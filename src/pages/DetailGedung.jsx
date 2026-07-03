import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { gedungList } from '../data/gedungData';

export default function DetailGedung() {
  const { id } = useParams();
  const gedung = gedungList.find(g => g.id === parseInt(id));

  if (!gedung) return <div className="text-white text-center py-20 bg-[#0b132b]">Gedung tidak ada.</div>;

  return (
    <div className="bg-[#0b132b] text-white min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto bg-[#1c2541] rounded border border-gray-800 overflow-hidden">
        <img src={gedung.image} alt={gedung.nama} className="w-full h-72 object-cover" />
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-serif text-[#c5a880] mb-2">{gedung.nama}</h1>
          <p className="text-xs text-gray-400 mb-4">Lokasi: {gedung.lokasi} | Rating Terverifikasi: {gedung.rating}★</p>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">{gedung.deskripsi}</p>
          <div className="flex justify-between items-center border-t border-gray-800 pt-6">
            <div>
              <span className="text-[10px] text-gray-400 block">HARGA KONTRAK</span>
              <span className="text-lg font-bold text-white">{gedung.harga}</span>
            </div>
            <NavLink to={`/booking/${gedung.id}`} className="bg-[#c5a880] text-[#0b132b] font-bold px-6 py-2.5 rounded text-xs tracking-wider uppercase hover:bg-[#b3956d]">
              Lanjut ke Booking
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}