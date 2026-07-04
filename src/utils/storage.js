export const storageKeys = {
  userSession: 'userSession',
  currentUser: 'propertCurrentUser',
  registeredClients: 'registeredClients',
  accountHistory: 'accountHistory',
  bookings: 'bookingData',
  transactions: 'localRiwayat',
  profile: 'propertProfile',
};

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

export function readJSON(key, fallback = null) {
  if (!canUseStorage()) return fallback;

  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  if (!canUseStorage()) return;

  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('propert-storage'));
}

export function removeItem(key) {
  if (!canUseStorage()) return;

  localStorage.removeItem(key);
  window.dispatchEvent(new Event('propert-storage'));
}

export function getCurrentUser() {
  if (!canUseStorage()) return null;

  const userSession = readJSON(storageKeys.userSession);
  if (userSession) return userSession;

  const storedUser = readJSON(storageKeys.currentUser);
  if (storedUser) return storedUser;

  const legacyName = localStorage.getItem('userName');
  const legacyRole = localStorage.getItem('userRole');
  const legacyEmail = localStorage.getItem('userEmail');

  if (!legacyName || !legacyRole) return null;

  return {
    name: legacyName,
    role: legacyRole,
    email: legacyEmail || '',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(legacyName)}&background=C9A96E&color=07111F`,
  };
}

export function setCurrentUser(user) {
  if (!canUseStorage()) return;

  writeJSON(storageKeys.userSession, user);
  writeJSON(storageKeys.currentUser, user);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('userRole', user.role);
  localStorage.setItem('userEmail', user.email || '');
}

export function clearCurrentUser() {
  removeItem(storageKeys.userSession);
  removeItem(storageKeys.currentUser);
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  window.dispatchEvent(new Event('propert-storage'));
}
