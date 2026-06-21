import { useNavigate } from "react-router-dom";
import VenueCard from "../components/VenueCard";
import Footer from "../components/Footer";
import { venues } from "../data/venues";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section
        className="min-h-screen flex items-end pb-0 relative"
        style={{
          background: `linear-gradient(rgba(11,18,27,0.78), rgba(13,27,46,0.90)),
                       url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070') center/cover no-repeat`,
        }}
      >
        <div className="w-full">
          <div className="px-[5%] pb-32 max-w-2xl">
            <p className="text-gold text-[0.75rem] tracking-[3px] uppercase mb-4">
              Platform Gedung Premium Indonesia
            </p>
            <h1 className="font-playfair text-white text-5xl leading-tight mb-5">
              Temukan Gedung <span className="text-gold">Premium</span> untuk Event Anda
            </h1>
            <p className="text-white/75 leading-relaxed mb-8 text-[0.95rem]">
              Platform terbaik untuk mencari dan menyewa gedung mewah, modern, dan eksklusif
              dengan proses cepat, transparan, dan terpercaya.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/venues")}
                className="bg-gold text-black px-8 py-3.5 text-sm font-medium rounded-sm
                           hover:bg-gold-dark hover:text-white transition-colors"
              >
                Cari Gedung Sekarang
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white/40 text-white px-8 py-3.5 text-sm rounded-sm
                           hover:border-gold hover:text-gold transition-colors"
              >
                Login ke Akun
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="bg-navy/90 backdrop-blur-sm border-t border-gold/20 px-[5%] py-5 flex gap-10">
            {[["250+","Gedung Tersedia"],["12K+","Booking Sukses"],["48","Kota di Indonesia"],["4.9★","Rating Platform"]].map(([n,l]) => (
              <div key={l}>
                <div className="font-playfair text-gold text-2xl">{n}</div>
                <div className="text-white/50 text-[0.7rem] tracking-widest uppercase mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE RECOMMENDATIONS */}
      <section className="bg-white py-20 px-[5%]">
        <div className="mb-10">
          <p className="text-gold text-[0.7rem] tracking-[3px] uppercase mb-2">Koleksi Pilihan</p>
          <h2 className="font-playfair text-navy text-3xl">Gedung Rekomendasi Kami</h2>
          <p className="text-gray-400 text-sm mt-1">Dipilih berdasarkan rating pengguna & kualitas fasilitas terbaik</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.slice(0, 3).map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/venues")}
            className="border border-navy text-navy px-10 py-3 text-sm rounded-sm
                       hover:bg-navy hover:text-white transition-colors"
          >
            Lihat Semua Gedung →
          </button>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-[5%] bg-[#FAF7F2]">
        <div className="mb-10">
          <p className="text-gold text-[0.7rem] tracking-[3px] uppercase mb-2">Kenapa PROPERT.ID?</p>
          <h2 className="font-playfair text-navy text-3xl">Keunggulan Platform Kami</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🏛️", title: "Gedung Terverifikasi", desc: "Semua gedung telah melalui proses verifikasi ketat oleh tim kami" },
            { icon: "⚡", title: "Booking Instan", desc: "Konfirmasi booking dalam 30 menit tanpa proses yang rumit" },
            { icon: "🔒", title: "Pembayaran Aman", desc: "Sistem escrow otomatis memastikan dana Anda selalu terlindungi" },
            { icon: "💬", title: "Support 24/7", desc: "Tim kami siap membantu kapan saja melalui chat, telpon, atau email" },
          ].map((item) => (
            <div key={item.title} className="text-center p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-playfair text-navy mb-2">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
