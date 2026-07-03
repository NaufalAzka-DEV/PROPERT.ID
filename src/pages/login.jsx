import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialAdminDatabase } from '../data/userDatabase';

export default function Login() {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ambil array registrasi client dari localStorage (atau array kosong jika belum ada)
    const localClients = JSON.parse(localStorage.getItem('registeredClients')) || [];

    if (isRegisterMode) {
      // PROSES PENDAFTARAN AKUN BARU
      const isExist = localClients.some(c => c.email === email) || initialAdminDatabase.some(a => a.email === email);
      if (isExist) {
        alert("Pendaftaran Gagal: Email ini sudah terdaftar!");
        return;
      }

      const newClient = { email, password, name: fullName, role: 'client' };
      localClients.push(newClient);
      localStorage.setItem('registeredClients', JSON.stringify(localClients));

      alert("Registrasi Berhasil! Silakan masuk menggunakan akun baru Anda.");
      setIsRegisterMode(false); // Kembalikan ke form login biasa
    } else {
      // PROSES LOGIN REAL-TIME
      // 1. Cek dari database Admin Utama
      const adminUser = initialAdminDatabase.find(a => a.email === email && a.password === password);
      // 2. Cek dari database Client hasil registrasi mandiri
      const clientUser = localClients.find(c => c.email === email && c.password === password);

      const foundUser = adminUser || clientUser;

      if (foundUser) {
        localStorage.setItem('userRole', foundUser.role);
        localStorage.setItem('userName', foundUser.name);
        alert(`Selamat Datang, ${foundUser.name}!`);
        navigate('/dashboard');
      } else {
        alert("Akses Ditolak: Kredensial tidak cocok dengan record data manapun.");
      }
    }
  };

  return (
    <div className="bg-[#0b132b] text-white min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#1c2541] p-8 rounded border border-gray-800 shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-serif text-center text-[#c5a880] mb-1">
          {isRegisterMode ? "Pendaftaran Akun" : "Masuk Akun"}
        </h2>
        <p className="text-[11px] text-center text-gray-400 mb-6">
          {isRegisterMode ? "Buat kredensial client baru secara real-time" : "Masukkan email terdaftar Anda"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="text-[10px] font-bold tracking-wider text-gray-300 block mb-1">NAMA LENGKAP</label>
              <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Masukkan nama Anda"
                className="w-full bg-[#0b132b] border border-gray-700 rounded p-2 text-xs focus:outline-none focus:border-[#c5a880]" />
            </div>
          )}
          <div>
            <label className="text-[10px] font-bold tracking-wider text-gray-300 block mb-1">ALAMAT EMAIL</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="nama@email.com"
              className="w-full bg-[#0b132b] border border-gray-700 rounded p-2 text-xs focus:outline-none focus:border-[#c5a880]" />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-wider text-gray-300 block mb-1">PASSWORD</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full bg-[#0b132b] border border-gray-700 rounded p-2 text-xs focus:outline-none focus:border-[#c5a880]" />
          </div>
          
          <button type="submit" className="w-full bg-[#c5a880] hover:bg-[#b3956d] text-[#0b132b] font-bold py-2.5 rounded text-xs transition uppercase mt-2">
            {isRegisterMode ? "Buat Akun Baru" : "Masuk"}
          </button>
        </form>

        <div className="text-center mt-5 pt-4 border-t border-gray-800 text-xs">
          <p className="text-gray-400">
            {isRegisterMode ? "Sudah punya akun?" : "Belum terdaftar di platform kami?"}{" "}
            <button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-[#c5a880] font-bold hover:underline">
              {isRegisterMode ? "Login di sini" : "Daftar Sekarang"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}