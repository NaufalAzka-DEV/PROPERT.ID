export default function Booking() {
  const steps = ["Detail Event", "Konfirmasi", "Pembayaran", "Selesai"];

  return (
    <div className="pt-24 pb-20 px-[5%]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl mb-1">Form Pemesanan</h2>
        <p className="text-gray-400 text-sm mb-8">Isi detail booking Anda dengan lengkap</p>

        {/* Steps */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0
                                 ${i === 0 ? "bg-navy text-white" : "bg-[#E5E0D8] text-gray-400"}`}>
                  {i + 1}
                </div>
                <span className={`text-xs ${i === 0 ? "text-navy font-medium" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-[#E5E0D8] mx-3" />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white border border-[#E5E0D8] p-7 rounded-sm">
          <h4 className="font-playfair text-lg mb-5">Informasi Pemesan</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[["Nama Lengkap","Nama pemesan"],["No. Telepon","+62..."]].map(([l,p])=>(
              <div key={l}>
                <label className="block text-xs font-medium text-navy mb-1.5">{l}</label>
                <input placeholder={p} className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm outline-none focus:border-gold" />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-xs font-medium text-navy mb-1.5">Email</label>
            <input type="email" placeholder="email@domain.com"
                   className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm outline-none focus:border-gold" />
          </div>

          <h4 className="font-playfair text-lg mb-5 pt-2 border-t border-[#E5E0D8]">Detail Acara</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[["Tanggal Mulai","date"],["Tanggal Selesai","date"]].map(([l,t])=>(
              <div key={l}>
                <label className="block text-xs font-medium text-navy mb-1.5">{l}</label>
                <input type={t} className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm outline-none focus:border-gold" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-navy mb-1.5">Jenis Acara</label>
              <select className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm outline-none focus:border-gold bg-white">
                {["Pernikahan","Seminar","Pameran","Ulang Tahun","Gala Dinner"].map(e=><option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-navy mb-1.5">Jumlah Tamu</label>
              <input type="number" placeholder="100" className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm outline-none focus:border-gold" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xs font-medium text-navy mb-1.5">Catatan Tambahan</label>
            <textarea rows={3} placeholder="Permintaan khusus, setup panggung, dll..."
                      className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm outline-none focus:border-gold resize-none" />
          </div>

          {/* Price Summary */}
          <div className="bg-[#FAF7F2] p-4 rounded-sm mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Ballroom Grand Jakarta</span><span>Rp 45.000.000</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Durasi 1 hari</span><span>×1</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>Biaya layanan (5%)</span><span>Rp 2.250.000</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-[#E5E0D8] pt-3">
              <span>Total</span>
              <span className="font-playfair text-lg text-navy">Rp 47.250.000</span>
            </div>
          </div>

          <button className="w-full bg-navy text-white py-3 text-sm font-medium rounded-sm hover:bg-navy/80 transition-colors">
            Lanjut ke Pembayaran →
          </button>
        </div>
      </div>
    </div>
  );
}
