import React, { useEffect, useState } from 'react';
import { initialRiwayatData } from '../data/gedungData';

export default function Riwayat() {
  const [role, setRole] = useState('');
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    setRole(localStorage.getItem('userRole') || 'client');
    
    // Gabungkan data riwayat default dengan transaksi dinamis hasil booking user
    const dynamicOrders = JSON.parse(localStorage.getItem('localRiwayat')) || [];
    setAllTransactions([...dynamicOrders, ...initialRiwayatData]);
  }, []);

  return (
    <div className="bg-[#0b132b] text-white min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-[#1c2541] p-6 rounded border border-gray-800 shadow-xl">
        <h2 className="text-xl font-serif text-[#c5a880] mb-1">Riwayat Transaksi</h2>
        <p className="text-xs text-gray-400 mb-6">Daftar berkas rekaman pesanan properti aktif Anda.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-[#c5a880] tracking-wider uppercase bg-[#0b132b]">
                <th className="p-3">ID ORDER</th>
                {role === 'admin' && <th className="p-3">KLIEN</th>}
                <th className="p-3">NAMA GEDUNG</th>
                <th className="p-3">TANGGAL EVENT</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">TOTAL BIAYA</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-800">
              {allTransactions.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#1f2a4d] transition">
                  <td className="p-3 font-mono font-bold text-gray-400">{item.id}</td>
                  {role === 'admin' && <td className="p-3 text-white font-medium">{item.client}</td>}
                  <td className="p-3 text-gray-300">{item.gedung}</td>
                  <td className="p-3 text-gray-400">{item.tanggal}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] rounded font-semibold ${item.status === 'Selesai' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-[#c5a880]">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}