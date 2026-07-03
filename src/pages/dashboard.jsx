import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedName = localStorage.getItem('userName');
    if (!savedRole) {
      alert("Silakan login terlebih dahulu untuk mengakses dashboard.");
      navigate('/masuk');
    } else {
      setRole(savedRole);
      setName(savedName);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/masuk');
  };

  return (
    <div className="bg-[#0b132b] text-white min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif">Selamat Datang, {name}!</h1>
            <p className="text-sm text-gray-400 mt-1">Status Hak Akses: <span className="text-[#c5a880] font-semibold uppercase">{role}</span></p>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 text-xs rounded font-bold transition">
            Keluar Aplikasi
          </button>
        </div>

        {/* LOGIKA KONDISIONAL POV ADMIN */}
        {role === 'admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1c2541] p-6 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-400 block">TOTAL PENDAPATAN BULAN INI</span>
                <span className="text-2xl font-bold text-[#c5a880]">Rp 80.000.000</span>
              </div>
              <div className="bg-[#1c2541] p-6 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-400 block">TOTAL GEDUNG AKTIF</span>
                <span className="text-2xl font-bold text-[#c5a880]">3 Gedung</span>
              </div>
              <div className="bg-[#1c2541] p-6 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-400 block">PERMINTAAN BOOKING BARU</span>
                <span className="text-2xl font-bold text-emerald-400">1 Pesanan</span>
              </div>
            </div>
            <div className="bg-[#1c2541] p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-serif mb-4 text-[#c5a880]">Sistem Log Kontrol Admin</h3>
              <p className="text-sm text-gray-300">Sebagai Admin, Anda dapat memvalidasi pembayaran masuk, memperbarui ketersediaan jadwal gedung, dan mengelola katalog produk eksternal.</p>
            </div>
          </div>
        )}

        {/* LOGIKA KONDISIONAL POV CLIENT */}
        {role === 'client' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1c2541] p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-serif text-[#c5a880] mb-2">Membership Tingkat Premium</h3>
                <p className="text-sm text-gray-400">Akun Anda memenuhi syarat potongan harga kupon loyalitas sebesar 5% untuk reservasi berikutnya.</p>
              </div>
              <div className="bg-[#1c2541] p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-serif text-[#c5a880] mb-2">Butuh Bantuan Konsultasi?</h3>
                <p className="text-sm text-gray-400">Hubungi personal konsultan kami via WhatsApp Priority untuk akomodasi penyesuaian dekorasi panggung.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}