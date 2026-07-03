import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gedungList } from '../data/gedungData';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const gedung = gedungList.find(g => g.id === parseInt(id));

  const [tanggal, setTanggal] = useState('');
  const [catatan, setCatatan] = useState('');

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    
    const currentUser = localStorage.getItem('userName') || "Client Umum";

    // Format objek transaksi baru
    const newOrder = {
      id: `TRX-${Math.floor(1000 + Math.random() * 9000)}`,
      client: currentUser,
      gedung: gedung.nama,
      tanggal: tanggal,
      status: "Diproses",
      total: gedung.harga
    };

    // Tarik riwayat lama dari localStorage jika ada, lalu gabungkan
    const currentLogs = JSON.parse(localStorage.getItem('localRiwayat')) || [];
    currentLogs.unshift(newOrder); // taruh di baris paling atas
    localStorage.setItem('localRiwayat', JSON.stringify(currentLogs));

    alert(`Booking Sukses untuk ${gedung.nama}! Pesanan Anda sedang diproses.`);
    navigate('/riwayat');
  };

  if (!gedung) return <div className="text-white text-center py-20">Data Properti Kosong.</div>;

  return (
    <div className="bg-[#0b132b] text-white min-h-screen py-12 px-6 flex items-center justify-center">
      <div className="bg-[#1c2541] p-6 rounded border border-gray-800 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-serif text-[#c5a880] mb-1">Formulir Reservasi</h2>
        <p className="text-[11px] text-gray-400 mb-5">Lengkapi jadwal sewa unit properti premium Anda.</p>
        
        <div className="bg-[#0b132b] p-3 rounded mb-4 border border-gray-800 text-xs">
          <p className="text-gray-400">Unit Terpilih:</p>
          <p className="font-semibold text-[#c5a880] text-sm mt-0.5">{gedung.nama}</p>
          <p className="text-gray-300 mt-1">{gedung.harga}</p>
        </div>

        <form onSubmit={handleConfirmBooking} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-300 block mb-1">PILIH TANGGAL EVENT</label>
            <input type="date" required value={tanggal} onChange={e => setTanggal(e.target.value)}
              className="w-full bg-[#0b132b] border border-gray-700 rounded p-2 text-xs focus:outline-none focus:border-[#c5a880]" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-300 block mb-1">CATATAN KHUSUS (OPSIONAL)</label>
            <textarea rows="3" placeholder="Contoh: Tambahan tata panggung luar ruangan..." value={catatan} onChange={e => setCatatan(e.target.value)}
              className="w-full bg-[#0b132b] border border-gray-700 rounded p-2 text-xs focus:outline-none focus:border-[#c5a880] resize-none" />
          </div>
          <button type="submit" className="w-full bg-[#c5a880] hover:bg-[#b3956d] text-[#0b132b] font-bold py-2.5 rounded text-xs transition uppercase">
            Konfirmasi & Amankan Jadwal
          </button>
        </form>
      </div>
    </div>
  );
}