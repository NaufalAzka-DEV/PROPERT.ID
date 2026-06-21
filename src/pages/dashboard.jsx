import { useState } from "react";
import { venues, historyData } from "../data/venues";

const statusBadge = {
  "Selesai":       "bg-green-100 text-green-700",
  "Menunggu Bayar":"bg-yellow-100 text-yellow-700",
  "Dibatalkan":    "bg-red-100 text-red-600",
  "Dikonfirmasi":  "bg-green-100 text-green-700",
  "Menunggu":      "bg-yellow-100 text-yellow-700",
  "Diproses":      "bg-blue-100 text-blue-700",
};

function Overview() {
  const stats = [
    { icon:"🏛️", val:"24",     label:"Total Gedung",           trend:"↑ 3 bulan ini",   up:true },
    { icon:"✅", val:"156",    label:"Booking Aktif",          trend:"↑ 12% vs bulan lalu", up:true },
    { icon:"💰", val:"Rp 847M",label:"Pendapatan Bulan Ini",   trend:"↑ 8% vs bulan lalu",  up:true },
    { icon:"⏳", val:"7",      label:"Pending Review",         trend:"Perlu ditangani",  up:false },
  ];

  const recentBookings = [
    { id:"#BK-0091", name:"Rina Wijaya",   venue:"Ballroom Grand Jakarta",     date:"15 Jun 2025", total:"Rp 47.250.000", status:"Dikonfirmasi" },
    { id:"#BK-0090", name:"Ahmad Fauzi",   venue:"Convention Hall Bandung",    date:"20 Jun 2025", total:"Rp 29.400.000", status:"Menunggu" },
    { id:"#BK-0089", name:"Dewi Sartika",  venue:"Ubud Royal Villa Bali",      date:"1 Jul 2025",  total:"Rp 57.750.000", status:"Diproses" },
    { id:"#BK-0088", name:"Hendra Kusuma", venue:"Grand Tower Surabaya",       date:"5 Jul 2025",  total:"Rp 39.900.000", status:"Dibatalkan" },
  ];

  return (
    <div>
      <div className="mb-7">
        <h2 className="font-playfair text-2xl text-navy">Dashboard Overview</h2>
        <p className="text-gray-400 text-sm mt-1">Selasa, 3 Juni 2025</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E0D8] p-5 rounded-sm">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-playfair text-2xl text-navy">{s.val}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            <div className={`text-xs mt-2 ${s.up ? "text-green-600" : "text-red-500"}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white border border-[#E5E0D8] rounded-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E5E0D8] flex items-center justify-between">
          <span className="font-medium text-sm">Booking Terbaru</span>
          <button className="bg-gold text-black text-xs px-3 py-1.5 rounded-sm font-medium">
            Lihat Semua
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E0D8]">
                {["ID","Pelanggan","Gedung","Tanggal","Total","Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-[#E5E0D8] last:border-0 hover:bg-[#FAF7F2]">
                  <td className="py-3 px-4 text-gray-400">{b.id}</td>
                  <td className="py-3 px-4 font-medium">{b.name}</td>
                  <td className="py-3 px-4 text-gray-500">{b.venue}</td>
                  <td className="py-3 px-4 text-gray-500">{b.date}</td>
                  <td className="py-3 px-4 font-medium">{b.total}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 text-xs rounded-full ${statusBadge[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VenueManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl text-navy">Kelola Gedung</h2>
        <button className="bg-gold text-black text-sm px-4 py-2 rounded-sm font-medium">+ Tambah Gedung</button>
      </div>
      <div className="bg-white border border-[#E5E0D8] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E0D8]">
                {["Nama Gedung","Lokasi","Kapasitas","Harga/Hari","Rating","Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {venues.map((v) => (
                <tr key={v.id} className="border-b border-[#E5E0D8] last:border-0 hover:bg-[#FAF7F2]">
                  <td className="py-3 px-4 font-medium">{v.name}</td>
                  <td className="py-3 px-4 text-gray-500">{v.loc}</td>
                  <td className="py-3 px-4 text-gray-500">{v.cap}</td>
                  <td className="py-3 px-4">{v.price}</td>
                  <td className="py-3 px-4 text-gold">⭐ {v.rating}</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full">Aktif</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [active, setActive] = useState("overview");

  const menus = [
    { key:"overview", icon:"📊", label:"Overview" },
    { key:"gedung",   icon:"🏛️", label:"Kelola Gedung" },
    { key:"booking",  icon:"📅", label:"Booking" },
    { key:"users",    icon:"👥", label:"Pengguna" },
  ];

  return (
    <div className="pt-16 min-h-screen grid grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="bg-navy min-h-screen pt-6">
        <div className="px-6 pb-4 border-b border-white/10 mb-2">
          <p className="text-white/50 text-xs">Selamat datang,</p>
          <p className="text-white font-medium mt-0.5">Budi Santoso</p>
          <p className="text-gold text-xs mt-0.5">Admin</p>
        </div>
        <p className="text-white/30 text-[0.65rem] uppercase tracking-[2px] px-6 py-2">Menu Utama</p>
        <ul>
          {menus.map((m) => (
            <li
              key={m.key}
              onClick={() => setActive(m.key)}
              className={`flex items-center gap-2.5 px-6 py-3 text-sm cursor-pointer transition-all
                          border-l-[3px] ${active === m.key
                            ? "border-gold text-gold bg-white/5"
                            : "border-transparent text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              {m.icon} {m.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="bg-[#FAF7F2] p-8">
        {active === "overview" && <Overview />}
        {active === "gedung"   && <VenueManagement />}
        {active === "booking"  && (
          <div>
            <h2 className="font-playfair text-2xl text-navy mb-6">Manajemen Booking</h2>
            <div className="bg-white border border-[#E5E0D8] rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[#E5E0D8]">
                    {["ID","Pelanggan","Gedung","Event","Total","Status"].map(h=>(
                      <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {historyData.map((h,i)=>(
                      <tr key={h.id} className="border-b last:border-0 hover:bg-[#FAF7F2]">
                        <td className="py-3 px-4 text-gray-400">{h.id}</td>
                        <td className="py-3 px-4">{["Rina W","Ahmad F","Dewi S","Hendra K"][i]}</td>
                        <td className="py-3 px-4 text-gray-500">{h.name}</td>
                        <td className="py-3 px-4 text-gray-500">{h.event}</td>
                        <td className="py-3 px-4 font-medium">{h.price}</td>
                        <td className="py-3 px-4"><span className={`px-2.5 py-0.5 text-xs rounded-full ${statusBadge[h.status]}`}>{h.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {active === "users" && (
          <div>
            <h2 className="font-playfair text-2xl text-navy mb-6">Manajemen Pengguna</h2>
            <p className="text-gray-400">Fitur manajemen pengguna tersedia di versi lengkap.</p>
          </div>
        )}
      </main>
    </div>
  );
}
