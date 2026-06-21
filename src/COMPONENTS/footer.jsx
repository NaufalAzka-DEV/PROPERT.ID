import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy pt-12 pb-6 px-[5%] text-white/60">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-8">
        <div>
          <div className="font-playfair text-white text-xl mb-2">
            PROPERT<span className="text-gold">.ID</span>
          </div>
          <p className="text-sm leading-relaxed">
            Platform premium untuk pencarian dan pemesanan gedung event terbaik di Indonesia.
          </p>
        </div>
        {[
          { title: "Platform", links: ["Cari Gedung", "Cara Booking", "Harga & Paket", "FAQ"] },
          { title: "Perusahaan", links: ["Tentang Kami", "Karir", "Blog", "Press"] },
          { title: "Hukum", links: ["Privasi", "Ketentuan", "Cookie", "Keamanan"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-white text-[0.7rem] uppercase tracking-widest mb-3">{col.title}</h4>
            {col.links.map((l) => (
              <a key={l} href="#" className="block text-[0.82rem] mb-1.5 hover:text-gold transition-colors">
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-4 flex justify-between text-xs text-white/30">
        <span>©2026 PROPERT.ID</span>
        <span>Made with ❤ for Indonesia</span>
      </div>
    </footer>
  );
}
