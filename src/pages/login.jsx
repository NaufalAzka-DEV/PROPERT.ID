import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { loginUser, registerUser } from '../services/api';
import { readJSON, storageKeys } from '../utils/storage';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(location.pathname === '/daftar');
  const [historyAccounts, setHistoryAccounts] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsRegisterMode(location.pathname === '/daftar');
  }, [location.pathname]);

  useEffect(() => {
    setHistoryAccounts(readJSON(storageKeys.accountHistory, []));
  }, []);

  const switchMode = () => {
    const nextPath = isRegisterMode ? '/masuk' : '/daftar';
    navigate(nextPath);
  };

  const selectAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (isRegisterMode && fullName.trim().length < 3) {
      setErrorMessage('Nama lengkap minimal 3 karakter.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Format email belum valid.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password minimal 6 karakter.');
      return;
    }

    setLoading(true);

    try {
      if (isRegisterMode) {
        await registerUser({ name: fullName.trim(), email: email.trim(), password });
        alert('Registrasi berhasil. Silakan masuk dengan akun baru Anda.');
        setIsRegisterMode(false);
        navigate('/masuk');
      } else {
        const user = await loginUser({ email: email.trim(), password });
        alert(`Login sukses. Selamat datang ${user.name}.`);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase text-gold">Akses Login</p>
          <h1 className="mt-3 font-playfair text-5xl font-semibold leading-tight">Masuk untuk mengelola booking premium</h1>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Gunakan akun anda untuk masuk  sebagai admin atau user.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 md:p-8">
          <p className="text-center text-sm font-semibold uppercase text-gold">
            {isRegisterMode ? 'Daftar Akun' : 'Masuk Akun'}
          </p>
          <h2 className="mt-2 text-center font-playfair text-3xl font-semibold">
            {isRegisterMode ? 'Buat akun baru' : 'Selamat datang kembali'}
          </h2>

          {errorMessage && (
            <div className="mt-6 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {errorMessage}
            </div>
          )}

          {!isRegisterMode && historyAccounts.length > 0 && (
            <div className="mt-6 border-b border-white/10 pb-5">
              <p className="mb-3 text-xs font-bold uppercase text-slate-400">Rekomendasi akun</p>
              <div className="grid gap-2">
                {historyAccounts.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => selectAccount(account)}
                    className="rounded-md border border-white/10 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-gold/50 hover:text-white"
                  >
                    {account.email} - {account.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {isRegisterMode && (
              <div>
                <label htmlFor="fullName" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                  Nama lengkap
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    setErrorMessage('');
                  }}
                  disabled={loading}
                  className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition disabled:opacity-60 focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrorMessage('');
                }}
                disabled={loading}
                className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition disabled:opacity-60 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="contoh: user123@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                Password
              </label>
              <div className="flex min-h-12 overflow-hidden rounded-md border border-white/10 bg-[#050b14] transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrorMessage('');
                  }}
                  disabled={loading}
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none disabled:opacity-60"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  disabled={loading}
                  className="border-l border-white/10 px-4 text-xs font-bold text-gold transition hover:bg-white/5 disabled:opacity-60"
                >
                  {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="min-h-12 w-full rounded-md bg-gold px-5 text-sm font-bold text-[#07111f] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 active:scale-[1.02]"
            >
              {loading ? 'Memproses...' : isRegisterMode ? 'Buat Akun' : 'Masuk Aplikasi'}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <button type="button" onClick={switchMode} className="text-sm font-bold text-gold transition hover:text-white">
              {isRegisterMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
