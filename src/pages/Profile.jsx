import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

export default function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { profile, loading, saving, saveProfile, persistProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Silakan login untuk membuka profile.');
      navigate('/masuk');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#07111f]" />;
  }

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto h-[520px] max-w-5xl animate-pulse rounded-lg bg-white/[0.05]" />
      </div>
    );
  }

  const updateField = (field, value) => {
    const nextProfile = { ...form, [field]: value };
    setForm(nextProfile);
    persistProfile(nextProfile);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    await saveProfile(form);
    setIsEditing(false);
    alert('Profile berhasil diperbarui');
  };

  const handleCancel = () => {
    setForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#07111f] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          align="left"
          eyebrow="User Profile"
          title="Kelola data pengguna"
          description="Kelola profile anda,dengan sebaik mungkin"
        />

        <ScrollReveal className="grid overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
            <img src={form.avatar} alt={form.name} className="h-28 w-28 rounded-lg object-cover ring-2 ring-gold/40" />
            <h2 className="mt-5 font-playfair text-3xl font-semibold text-white">{form.name}</h2>
            <p className="mt-2 text-sm text-gold">{form.role === 'admin' ? 'Administrator' : 'Client Premium'}</p>
            <p className="mt-5 text-sm leading-7 text-slate-300">{form.bio}</p>
          </aside>

          <form onSubmit={handleSave} className="space-y-5 p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="profileName" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                  Nama
                </label>
                <input
                  id="profileName"
                  type="text"
                  disabled={!isEditing}
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition disabled:opacity-70 focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="profileEmail" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                  Email
                </label>
                <input
                  id="profileEmail"
                  type="email"
                  disabled={!isEditing}
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition disabled:opacity-70 focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="profilePhone" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                  Telepon
                </label>
                <input
                  id="profilePhone"
                  type="text"
                  disabled={!isEditing}
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition disabled:opacity-70 focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="profileAvatar" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                  Avatar URL
                </label>
                <input
                  id="profileAvatar"
                  type="url"
                  disabled={!isEditing}
                  value={form.avatar}
                  onChange={(event) => updateField('avatar', event.target.value)}
                  className="min-h-12 w-full rounded-md border border-white/10 bg-[#050b14] px-4 text-sm text-white outline-none transition disabled:opacity-70 focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label htmlFor="profileBio" className="mb-2 block text-xs font-bold uppercase text-slate-300">
                Bio
              </label>
              <textarea
                id="profileBio"
                rows="4"
                disabled={!isEditing}
                value={form.bio}
                onChange={(event) => updateField('bio', event.target.value)}
                className="w-full resize-none rounded-md border border-white/10 bg-[#050b14] px-4 py-3 text-sm text-white outline-none transition disabled:opacity-70 focus:border-gold"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f] transition hover:bg-white disabled:opacity-60 active:scale-[1.02]"
                  >
                    {saving ? 'Menyimpan...' : 'Simpan Profile'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-gold/50 hover:text-gold active:scale-[1.02]"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-[#07111f] transition hover:bg-white active:scale-[1.02]"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}
