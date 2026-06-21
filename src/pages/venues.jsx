import { useParams, useNavigate } from "react-router-dom";
import { venues } from "../data/venues";

export default function VenueDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const venue     = venues.find((v) => v.id === parseInt(id));

  if (!venue) return <p className="pt-24 text-center text-gray-400">Gedung tidak ditemukan.</p>;

  const ratingCategories = [
    { label: "Kebersihan", pct: 96 },
    { label: "Fasilitas",  pct: 92 },
    { label: "Lokasi",     pct: 88 },
    { label: "Layanan",    pct: 94 },
  ];

  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-80 md:h-[360px] overflow-hidden">
        <img src={venue.img} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent" />
        <div className="absolute bottom-6 left-[5%] text-white">
          <h1 className="font-playfair text-3xl">{venue.name}</h1>
          <p className="text-white/70 mt-1">📍 {venue.loc}</p>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-8 px-[5%] py-10">
        {/* Left */}
        <div>
          <h3 className="font-playfair text-xl mb-3">Tentang Gedung</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{venue.desc}</p>

          <h3 className="font-playfair text-xl mt-8 mb-3">Fasilitas</h3>
          <div className="grid grid-cols-2 gap-2">
            {venue.amenities.map((a) => (
              <div key={a} className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                {a}
              </div>
            ))}
          </div>

          <h3 className="font-playfair text-xl mt-8 mb-3">Rating & Ulasan</h3>
          <div className="space-y-2.5">
            {ratingCategories.map(({ label, pct }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-20">{label}</span>
                <div className="flex-1 h-1.5 bg-[#E5E0D8] rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-medium w-6">{(pct / 20).toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Booking Card */}
        <div>
          <div className="border border-[#E5E0D8] p-6 rounded-sm sticky top-20 bg-white">
            <div className="font-playfair text-3xl text-navy">{venue.price}</div>
            <p className="text-xs text-gray-400 mt-1 mb-4">per hari · belum termasuk pajak</p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-navy mb-1.5">Tanggal Event</label>
                <input type="date" className="w-full border border-[#E5E0D8] px-3 py-2 text-sm rounded-sm
                                              outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1.5">Durasi (hari)</label>
                <input type="number" defaultValue={1} min={1}
                       className="w-full border border-[#E5E0D8] px-3 py-2 text-sm rounded-sm
                                  outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1.5">Jenis Event</label>
                <select className="w-full border border-[#E5E0D8] px-3 py-2 text-sm rounded-sm
                                   outline-none focus:border-gold bg-white">
                  {["Pernikahan","Seminar","Pameran","Gala Dinner"].map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => navigate("/booking")}
              className="w-full bg-navy text-white py-3 text-sm font-medium rounded-sm
                         hover:bg-navy/80 transition-colors mb-2"
            >
              Pesan Sekarang
            </button>
            <button
              className="w-full border border-[#E5E0D8] py-3 text-sm rounded-sm
                         hover:border-gold transition-colors"
            >
              Hubungi Pengelola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
