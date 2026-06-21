import { historyData } from "../data/venues";

const statusStyle = {
  "Selesai":       "bg-green-100 text-green-700",
  "Menunggu Bayar":"bg-yellow-100 text-yellow-700",
  "Dibatalkan":    "bg-red-100 text-red-600",
};

export default function History() {
  return (
    <div className="pt-24 pb-20 px-[5%]">
      <div className="mb-8">
        <p className="text-gold text-[0.7rem] tracking-[3px] uppercase mb-2">Akun Saya</p>
        <h2 className="font-playfair text-navy text-3xl">Riwayat Transaksi</h2>
        <p className="text-gray-400 text-sm mt-1">Semua riwayat booking dan pembayaran Anda</p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {historyData.map((h) => (
          <div
            key={h.id}
            className="bg-white border border-[#E5E0D8] rounded-sm p-5 grid grid-cols-[80px_1fr_auto]
                       gap-5 items-center hover:border-gold transition-colors"
          >
            <img src={h.img} alt={h.name} className="w-20 h-16 object-cover rounded-sm" />
            <div>
              <p className="font-medium text-sm mb-1">{h.name}</p>
              <p className="text-xs text-gray-400">📍 {h.loc} · 📅 {h.date} · {h.event}</p>
            </div>
            <div className="text-right">
              <p className="font-playfair text-lg text-navy">{h.price}</p>
              <span className={`text-xs px-2.5 py-0.5 rounded-full mt-1 inline-block ${statusStyle[h.status]}`}>
                {h.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}