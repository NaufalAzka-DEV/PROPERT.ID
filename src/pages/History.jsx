import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../hooks/useAuth';
import { getTransactions } from '../services/api';

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="left"
          eyebrow="Riwayat"
          title="Transaksi dan booking"
          description="Transaksi anda akan tertera pada tabel di bawah ini"
        />

        <ScrollReveal className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={loadTransactions}
            className="rounded-md border border-gold/40 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-[#07111f] active:scale-[1.02]"
          >
            Refresh Data
          </button>
        </ScrollReveal>

        {loading ? (
          <div className="h-80 animate-pulse rounded-lg bg-white/[0.05]" />
        ) : transactions.length === 0 ? (
          <EmptyState
            title="Belum ada transaksi"
            description="Mulailah transaksi,riwayat transaksi anda masih kosong!"
            action={
              <NavLink to="/gedung" className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f]">
                Cari Gedung
              </NavLink>
            }
          />
        ) : (
          <ScrollReveal className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#050b14] text-xs uppercase text-gold">
                  <tr>
                    <th className="px-5 py-4">ID</th>
                    {user?.role === 'admin' && <th className="px-5 py-4">Client</th>}
                    <th className="px-5 py-4">Gedung</th>
                    <th className="px-5 py-4">Tanggal</th>
                    <th className="px-5 py-4">Paket</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {transactions.map((item) => (
                    <tr key={item.id} className="transition hover:bg-white/[0.03]">
                      <td className="px-5 py-4 font-mono text-slate-300">{item.id}</td>
                      {user?.role === 'admin' && <td className="px-5 py-4 text-white">{item.client}</td>}
                      <td className="px-5 py-4 text-slate-200">{item.gedung}</td>
                      <td className="px-5 py-4 text-slate-400">{item.tanggal}</td>
                      <td className="px-5 py-4 text-slate-400">{item.paket || 'Royal'}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.status === 'Selesai'
                              ? 'bg-emerald-500/15 text-emerald-300'
                              : 'bg-amber-400/15 text-amber-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-gold">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
