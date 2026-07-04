export function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

export function createTransactionId() {
  return `TRX-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function toDisplayDate(value) {
  if (!value) return '-';

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}
