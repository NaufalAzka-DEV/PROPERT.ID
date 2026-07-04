import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const baseLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/gedung', label: 'Gedung' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/riwayat', label: 'Riwayat' },
];

function navClass({ isActive }) {
  return `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-gold/15 text-gold ring-1 ring-gold/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const links = isAuthenticated ? [...baseLinks, { to: '/profile', label: 'Profile' }] : baseLinks;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    alert('Anda telah keluar dari akun.');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold text-sm font-black text-[#07111f]">
            P
          </span>
          <span className="font-playfair text-xl font-semibold text-white">
            PROPERT<span className="text-gold">.ID</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:border-gold/40"
              >
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-md object-cover" />
                <span className="max-w-32 truncate text-sm font-semibold text-white">{user.name}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/masuk" className="rounded-md px-4 py-2 text-sm font-semibold text-slate-200 transition hover:text-white">
                Masuk
              </NavLink>
              <NavLink to="/daftar" className="rounded-md bg-gold px-4 py-2 text-sm font-bold text-[#07111f] transition hover:bg-white">
                Daftar
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white lg:hidden"
          aria-label="Buka menu navigasi"
        >
          Menu
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#07111f] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass} onClick={() => setIsOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-md bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200"
              >
                Logout dari {user.name}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <NavLink
                  to="/masuk"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Masuk
                </NavLink>
                <NavLink
                  to="/daftar"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-gold px-4 py-3 text-center text-sm font-bold text-[#07111f]"
                >
                  Daftar
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
