import { createTransactionId, normalizeText, toDisplayDate } from '../utils/formatters';
import {
  getCurrentUser,
  readJSON,
  setCurrentUser,
  storageKeys,
  writeJSON,
} from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL;

export const fallbackBuildingImage =
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200';

const buildings = [
  {
    id: 1,
    nama: 'The Grand Ballroom Majestic',
    lokasi: 'Jakarta Selatan',
    harga: 'Rp 45.000.000 / Hari',
    rating: 4.9,
    tipe: 'Ballroom',
    kapasitas: '1.200 tamu',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Ballroom megah dengan lampu kristal, karpet premium, dan sistem akustik untuk acara formal berskala besar.',
    fasilitas: ['VIP lounge', 'Sound system', 'Valet parking', 'Lighting premium'],
  },
  {
    id: 2,
    nama: 'Skyline Glass Pavilion',
    lokasi: 'Jakarta Pusat',
    harga: 'Rp 35.000.000 / Hari',
    rating: 4.8,
    tipe: 'Pavilion',
    kapasitas: '650 tamu',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Paviliun kaca modern dengan panorama kota, cocok untuk gala dinner, product launch, dan wedding intimate.',
    fasilitas: ['Glass hall', 'City view', 'Catering partner', 'Private lobby'],
  },
  {
    id: 3,
    nama: 'Emerald Garden Resonanz',
    lokasi: 'Bandung',
    harga: 'Rp 27.500.000 / Hari',
    rating: 4.7,
    tipe: 'Garden Hall',
    kapasitas: '500 tamu',
    image: 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Area semi-outdoor dengan taman hijau dan udara sejuk untuk acara keluarga, akad, dan gathering perusahaan.',
    fasilitas: ['Garden stage', 'Rain cover', 'Bridal room', 'Outdoor lighting'],
  },
  {
    id: 4,
    nama: 'The Ritz Royal Hall',
    lokasi: 'Surabaya',
    harga: 'Rp 50.000.000 / Hari',
    rating: 5,
    tipe: 'Convention Hall',
    kapasitas: '1.800 tamu',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Gedung konvensi bergaya klasik dengan ornamen emas, ceiling tinggi, dan akses tamu yang sangat luas.',
    fasilitas: ['Grand foyer', 'LED wall', 'Executive suite', 'Multi access gate'],
  },
  {
    id: 5,
    nama: 'Ocean Breeze Vista',
    lokasi: 'Bali',
    harga: 'Rp 65.000.000 / Hari',
    rating: 4.9,
    tipe: 'Resort Venue',
    kapasitas: '350 tamu',
    image: 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Venue tepi pantai dengan altar kaca dan sunset view untuk pernikahan destinasi yang berkesan.',
    fasilitas: ['Beach view', 'Private deck', 'Resort stay', 'Sunset ceremony'],
  },
  {
    id: 6,
    nama: 'The Platinum Atrium',
    lokasi: 'Medan',
    harga: 'Rp 38.000.000 / Hari',
    rating: 4.6,
    tipe: 'Atrium',
    kapasitas: '900 tamu',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Atrium modern dengan lantai marmer dan layout fleksibel untuk exhibition, wisuda, dan acara pemerintahan.',
    fasilitas: ['Marble floor', 'Exhibition booth', 'Loading dock', 'Security team'],
  },
  {
    id: 7,
    nama: 'Aurora Convention Center',
    lokasi: 'Yogyakarta',
    harga: 'Rp 30.000.000 / Hari',
    rating: 4.8,
    tipe: 'Convention Center',
    kapasitas: '1.000 tamu',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Pusat konvensi dengan multimedia lengkap, cocok untuk seminar nasional, konser kecil, dan expo kampus.',
    fasilitas: ['Projector hall', 'Breakout room', 'Press room', 'Backstage area'],
  },
  {
    id: 8,
    nama: 'Heritage Palace Hall',
    lokasi: 'Solo',
    harga: 'Rp 25.000.000 / Hari',
    rating: 4.7,
    tipe: 'Heritage Hall',
    kapasitas: '600 tamu',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Arsitektur heritage dengan interior hotel bintang lima untuk acara budaya, resepsi, dan jamuan resmi.',
    fasilitas: ['Heritage facade', 'Royal dining', 'Photo corner', 'Protocol room'],
  },
  {
    id: 9,
    nama: 'Metropolis Sky Lounge',
    lokasi: 'Tangerang',
    harga: 'Rp 42.000.000 / Hari',
    rating: 4.8,
    tipe: 'Sky Lounge',
    kapasitas: '300 tamu',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Lounge rooftop dengan pemandangan kota, ideal untuk brand activation, dinner, dan private celebration.',
    fasilitas: ['Rooftop deck', 'Bar area', 'City skyline', 'Private lift'],
  },
  {
    id: 10,
    nama: 'Sapphire Dome Pavilion',
    lokasi: 'Makassar',
    harga: 'Rp 33.000.000 / Hari',
    rating: 4.6,
    tipe: 'Dome Pavilion',
    kapasitas: '750 tamu',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Pavilion berkubah kaca dengan pencahayaan natural dan layout panggung yang mudah disesuaikan.',
    fasilitas: ['Dome roof', 'Natural light', 'Stage rigging', 'VIP parking'],
  },
  {
    id: 11,
    nama: 'Vespera Executive Hall',
    lokasi: 'Bekasi',
    harga: 'Rp 29.000.000 / Hari',
    rating: 4.5,
    tipe: 'Executive Hall',
    kapasitas: '520 tamu',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Hall eksekutif yang praktis untuk town hall perusahaan, award night, dan peluncuran komunitas.',
    fasilitas: ['Hybrid meeting', 'LED backdrop', 'Coffee corner', 'Admin desk'],
  },
  {
    id: 12,
    nama: 'Lumiere Urban Estate',
    lokasi: 'Semarang',
    harga: 'Rp 31.500.000 / Hari',
    rating: 4.7,
    tipe: 'Urban Estate',
    kapasitas: '700 tamu',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Gedung urban premium dengan akses transportasi mudah, lobby luas, dan area pre-function elegan.',
    fasilitas: ['Pre-function area', 'Transit access', 'Wide lobby', 'Vendor room'],
  },
  {
    id: 13,
    nama: 'Aurelia Crown Ballroom',
    lokasi: 'Jakarta Utara',
    harga: 'Rp 47.000.000 / Hari',
    rating: 4.9,
    tipe: 'Luxury Ballroom',
    kapasitas: '1.100 tamu',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Ballroom mewah dengan ceiling artistik, lighting hangat, dan area pre-function yang luas untuk acara high-end.',
    fasilitas: ['Crystal lighting', 'VIP holding room', 'Grand staircase', 'Premium catering'],
  },
  {
    id: 14,
    nama: 'Northstar Skyline Hall',
    lokasi: 'BSD City',
    harga: 'Rp 36.500.000 / Hari',
    rating: 4.6,
    tipe: 'Skyline Hall',
    kapasitas: '780 tamu',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Gedung modern bernuansa city skyline dengan lobby kaca, cocok untuk launching produk dan konferensi bisnis.',
    fasilitas: ['Glass lobby', 'Business lounge', 'Media room', 'Drop-off premium'],
  },
  {
    id: 15,
    nama: 'Opulence Marble House',
    lokasi: 'Malang',
    harga: 'Rp 28.500.000 / Hari',
    rating: 4.7,
    tipe: 'Marble Hall',
    kapasitas: '620 tamu',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
    deskripsi: 'Hall elegan dengan aksen marmer, ambience hangat, dan tata ruang fleksibel untuk pernikahan maupun gala dinner.',
    fasilitas: ['Marble foyer', 'Acoustic panel', 'Vendor suite', 'Photo gallery'],
  },
];

const normalizeBuilding = (building) => ({
  ...building,
  id: Number(building.id),
  image: building.image || fallbackBuildingImage,
});

const normalizedBuildings = buildings.map(normalizeBuilding);

const defaultTransactions = [
  {
    id: 'TRX-8821',
    client: 'Reza Rahadian',
    gedung: 'The Grand Ballroom Majestic',
    tanggal: '12 Juli 2026',
    status: 'Selesai',
    total: 'Rp 45.000.000',
    paket: 'Royal',
  },
];

const demoAccounts = [
  {
    email: 'admin@propert.ac.id',
    password: 'admin123',
    name: 'Admin Utama',
    role: 'admin',
  },
  {
    email: 'user123@gmail.com',
    password: 'user123',
    name: 'User Demo',
    role: 'user',
  },
  {
    email: 'naufal@gmail.com',
    password: 'client123',
    name: 'Muhammad Naufal',
    role: 'client',
  },
];

function cloneData(data) {
  if (data === null || data === undefined) return data;
  return JSON.parse(JSON.stringify(data));
}

function mockResponse(data, timeout = 250) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(cloneData(data)), timeout);
  });
}

async function request(path, fallback, options = {}) {
  if (!API_URL) return mockResponse(fallback);

  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil data dari server.');
  }

  return response.json();
}

export async function getBuildings() {
  return request('/buildings', normalizedBuildings);
}

export async function getBuildingById(id) {
  const building = normalizedBuildings.find((item) => item.id === Number(id));
  return request(`/buildings/${id}`, building || null);
}

export async function loginUser({ email, password }) {
  if (API_URL) {
    const user = await request('/auth/login', null, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setCurrentUser(user);
    return user;
  }

  const registered = readJSON(storageKeys.registeredClients, []);
  const allAccounts = [...registered, ...demoAccounts];
  const user = allAccounts.find(
    (account) => normalizeText(account.email) === normalizeText(email) && account.password === password,
  );

  if (!user) {
    throw new Error('Email atau password belum terdaftar.');
  }

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=C9A96E&color=07111F`;
  const currentUser = { ...user, avatar };
  const history = readJSON(storageKeys.accountHistory, []);

  if (!history.some((item) => normalizeText(item.email) === normalizeText(user.email))) {
    writeJSON(storageKeys.accountHistory, [
      ...history,
      { email: user.email, password: user.password, name: user.name },
    ]);
  }

  setCurrentUser(currentUser);
  writeJSON(storageKeys.profile, {
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
    phone: '+62 812-3456-7890',
    avatar: currentUser.avatar,
    bio: 'Pelanggan PROPERT.ID yang sedang menyiapkan event terbaik.',
  });

  return mockResponse(currentUser, 120);
}

export async function registerUser({ name, email, password }) {
  const registered = readJSON(storageKeys.registeredClients, []);
  const isExist = registered.some((account) => normalizeText(account.email) === normalizeText(email));

  if (isExist) {
    throw new Error('Email sudah digunakan.');
  }

  const role = email.endsWith('@propert.ac.id') ? 'admin' : 'client';
  const newAccount = { name, email, password, role };
  writeJSON(storageKeys.registeredClients, [...registered, newAccount]);

  return mockResponse(newAccount, 120);
}

export async function getProfile() {
  const user = getCurrentUser();
  const storedProfile = readJSON(storageKeys.profile);

  if (storedProfile) return mockResponse(storedProfile, 160);

  return mockResponse({
    name: user?.name || 'Guest PROPERT.ID',
    email: user?.email || 'guest@propert.id',
    role: user?.role || 'client',
    phone: '+62 812-3456-7890',
    avatar: user?.avatar || 'https://ui-avatars.com/api/?name=Guest&background=C9A96E&color=07111F',
    bio: 'Akun demo untuk presentasi pemesanan gedung premium.',
  }, 160);
}

export async function updateProfile(profile) {
  writeJSON(storageKeys.profile, profile);
  setCurrentUser({
    name: profile.name,
    email: profile.email,
    role: profile.role || 'client',
    avatar: profile.avatar,
  });

  return mockResponse(profile, 160);
}

export async function getTransactions() {
  const savedTransactions = readJSON(storageKeys.transactions, []);
  return mockResponse([...savedTransactions, ...defaultTransactions], 180);
}

export async function getBookings() {
  return mockResponse(readJSON(storageKeys.bookings, []), 180);
}

export async function updateBookingStatus(bookingId, status) {
  const bookings = readJSON(storageKeys.bookings, []);
  const nextBookings = bookings.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking));
  writeJSON(storageKeys.bookings, nextBookings);

  const transactions = readJSON(storageKeys.transactions, []);
  const nextTransactions = transactions.map((transaction) =>
    transaction.id === bookingId ? { ...transaction, status } : transaction,
  );
  writeJSON(storageKeys.transactions, nextTransactions);

  return mockResponse(nextBookings.find((booking) => booking.id === bookingId), 120);
}

export async function createBooking({ building, date, note, packageName }) {
  const currentUser = getCurrentUser();
  const bookingId = createTransactionId();
  const transaction = {
    id: bookingId,
    client: currentUser?.name || 'Client Umum',
    clientEmail: currentUser?.email || 'guest@propert.id',
    buildingId: building.id,
    gedung: building.nama,
    tanggal: toDisplayDate(date),
    status: 'Menunggu Persetujuan',
    total: building.harga.replace(' / Hari', ''),
    paket: packageName,
    catatan: note || 'Tidak ada catatan khusus.',
    image: building.image || fallbackBuildingImage,
    lokasi: building.lokasi,
    createdAt: new Date().toISOString(),
  };

  const currentBookings = readJSON(storageKeys.bookings, []);
  const currentTransactions = readJSON(storageKeys.transactions, []);
  writeJSON(storageKeys.bookings, [transaction, ...currentBookings]);
  writeJSON(storageKeys.transactions, [transaction, ...currentTransactions]);

  return mockResponse(transaction, 180);
}
