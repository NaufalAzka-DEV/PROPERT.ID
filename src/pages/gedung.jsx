import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gedungList } from '../data/gedungData';

export default function Gedung() {
  const [search, setSearch] = useState('');

  const filtered = gedungList.filter(g => 
    g.nama.toLowerCase().includes(search.toLowerCase()) || 
    g.lokasi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0b132b] text-white min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-[#c5a880] mb-2">Eksplorasi Gedung</h1>
          <p className="text-xs text-gray-400">Pilih dari 10 opsi properti eksklusif teratas kami</p>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <input 
            type="text" 
            placeholder="Ketik nama atau lokasi gedung..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c2541] border border-gray-700 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#c5a880]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(g => (
            <div key={g.id} className="bg-[#1c2541] rounded border border-gray-800 overflow-hidden flex flex-col justify-between hover:border-[#c5a880] transition">
              <img src={g.image} alt={g.nama} className="w-full h-48 object-cover" />
              <div className="p-5 flex-grow">
                <span className="text-[10px] text-[#c5a880] font-bold block mb-1">📍 {g.lokasi}</span>
                <h3 className="text-lg font-serif mb-2">{g.nama}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{g.deskripsi}</p>
              </div>
              <div className="p-5 pt-0 border-t border-gray-800/50 mt-4 flex justify-between items-center">
                <span className="text-xs text-[#c5a880] font-semibold">{g.harga}</span>
                <NavLink to={`/gedung/${g.id}`} className="bg-[#c5a880] text-[#0b132b] text-xs font-bold px-3 py-1.5 rounded hover:bg-[#b3956d]">
                  Detail
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}