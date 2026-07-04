import { useCallback, useEffect, useMemo, useState } from 'react';
import { getBookings, updateBookingStatus } from '../services/api';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshBookings = useCallback(async () => {
    setLoading(true);
    const data = await getBookings();
    setBookings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshBookings();

    window.addEventListener('propert-storage', refreshBookings);
    return () => window.removeEventListener('propert-storage', refreshBookings);
  }, [refreshBookings]);

  const approveBooking = async (bookingId) => {
    await updateBookingStatus(bookingId, 'Disetujui');
    setBookings((current) =>
      current.map((booking) => (booking.id === bookingId ? { ...booking, status: 'Disetujui' } : booking)),
    );
  };

  const pendingBookings = useMemo(() => {
    return bookings.filter((booking) => booking.status !== 'Disetujui');
  }, [bookings]);

  return {
    bookings,
    pendingBookings,
    loading,
    refreshBookings,
    approveBooking,
  };
}
