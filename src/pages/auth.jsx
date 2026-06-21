import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthLeft({ title, desc }) {
  return (
    <div
      className="hidden md:flex flex-col justify-center px-16"
      style={{
        background: `linear-gradient(rgba(11,18,27,0.82), rgba(13,27,46,0.92)),
                     url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070') center/cover`,
      }}
    >
      <p className="text-gold text-[0.7rem] tracking-[3px] uppercase mb-4">PROPERT.ID</p>
      <h2 className="font-playfair text-white text-4xl mb-4">{title}</h2>
      <p className="text-white/70 leading-relaxed text-sm">{desc}</p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {[["250+","Gedung Premium"],["4.9★","Rating Platform"]].map(([n,l])=>(
          <div key={l} className="bg-white/10 border border-gold/20 p-4 rounded-sm text-center">
            <div className="font-playfair text-white text-xl">{n}</div>
            <div className="text-white/50 text-[0.7rem] mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Login() {
  const navigate  = useNavigate();
  const [role, setRole] = useState("user");

  return (
    <div className="pt-16 min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthLeft
        title="Selamat Datang Kembali"
        desc="Masuk ke akun Anda untuk mengakses ribuan gedung premium dan mengelola booking dengan mudah."
      />
      <div className="flex items-center justify-center px-8 md:px-20 bg-white">
        <div className="w-full max-w-sm">
          <h3 className="font-playfair text-2xl mb-1">Masuk Akun</h3>
          <p className="text-gray-400 text-sm mb-6">
            Belum punya akun?{" "}
            <button onClick={() => navigate("/register")} className="text-gold hover:underline">
              Daftar sekarang
            </button>
          </p>

          {/* Role toggle */}
          <div className="flex border border-[#E5E0D8] rounded-sm overflow-hidden mb-5">
            {["user","admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm capitalize transition-colors ${
                  role === r ? "bg-navy text-white" : "bg-white text-gray-400 hover:bg-gray-50"
                }`}
              >
                {r === "user" ? "User" : "Admin"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-navy mb-1.5">Email</label>
              <input type="email" placeholder="nama@email.com"
                     className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm
                                outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy mb-1.5">Password</label>
              <input type="password" placeholder="••••••••"
                     className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm
                                outline-none focus:border-gold" />
            </div>
            <div className="flex justify-end">
              <button className="text-xs text-gold hover:underline">Lupa password?</button>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-navy text-white py-3 text-sm font-medium rounded-sm
                         hover:bg-navy/80 transition-colors"
            >
              Masuk
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Belum punya akun?{" "}
            <button onClick={() => navigate("/register")} className="text-gold hover:underline">
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const navigate = useNavigate();

  return (
    <div className="pt-16 min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthLeft
        title="Bergabung Bersama Kami"
        desc="Daftarkan diri Anda dan nikmati kemudahan menyewa gedung premium di seluruh Indonesia."
      />
      <div className="flex items-center justify-center px-8 md:px-20 bg-white py-10">
        <div className="w-full max-w-sm">
          <h3 className="font-playfair text-2xl mb-1">Buat Akun</h3>
          <p className="text-gray-400 text-sm mb-6">
            Sudah punya akun?{" "}
            <button onClick={() => navigate("/login")} className="text-gold hover:underline">
              Masuk di sini
            </button>
          </p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[["Nama Depan","Budi"],["Nama Belakang","Santoso"]].map(([lbl,ph]) => (
                <div key={lbl}>
                  <label className="block text-xs font-medium text-navy mb-1.5">{lbl}</label>
                  <input placeholder={ph} className="w-full border border-[#E5E0D8] px-3 py-2.5 text-sm rounded-sm outline-none focus:border-gold" />
                </div>
              ))}
            </div>
            {[
              ["Email","email","nama@email.com"],
              ["No. Telepon","tel","+62 812 xxxx xxxx"],
              ["Password","password","Min. 8 karakter"],
              ["Konfirmasi Password","password","Ulangi password"],
            ].map(([lbl,type,ph]) => (
              <div key={lbl}>
                <label className="block text-xs font-medium text-navy mb-1.5">{lbl}</label>
                <input type={type} placeholder={ph}
                       className="w-full border border-[#E5E0D8] px-3.5 py-2.5 text-sm rounded-sm
                                  outline-none focus:border-gold" />
              </div>
            ))}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-navy text-white py-3 text-sm font-medium rounded-sm
                         hover:bg-navy/80 transition-colors mt-1"
            >
              Buat Akun
            </button>
            <p className="text-xs text-gray-400 text-center">
              Dengan mendaftar, Anda menyetujui{" "}
              <button className="text-gold hover:underline">Syarat & Ketentuan</button> kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
