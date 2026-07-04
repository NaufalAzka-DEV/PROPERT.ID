import { NavLink } from 'react-router-dom';

const platformLinks = [
  { label: 'Cari Gedung', to: '/gedung' },
  { label: 'Riwayat Booking', to: '/riwayat' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Profile', to: '/profile' },
];

const demoLinks = ['Cara Booking', 'Harga & Paket', 'FAQ', 'Kebijakan Privasi'];

export default function Footer() {
  const handleDemoClick = (label) => {
    alert(`${label} tersedia sebagai simulasi pada mode presentasi.`);
  };

  return (
    <footer className="border-t border-white/10 bg-[#050b14] px-5 py-12 text-slate-300 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-playfair text-2xl font-semibold text-white">
            PROPERT<span className="text-gold">.ID</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            Platform pencarian dan pemesanan gedung premium untuk event, wedding, seminar, dan kebutuhan korporasi.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase text-gold">Navigasi</h4>
          <div className="mt-4 grid gap-3">
            {platformLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className="text-sm text-slate-400 transition hover:text-white">
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase text-gold">Bantuan</h4>
          <div className="mt-4 grid gap-3">
            {demoLinks.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleDemoClick(label)}
                className="text-left text-sm text-slate-400 transition hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>Copyright 2026 PROPERT.ID</span>
        <span>Made with ❤️</span>
      </div>
    </footer>
  );
}
