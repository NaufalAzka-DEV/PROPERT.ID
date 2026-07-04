import { useEffect, useMemo, useState } from 'react';
import { getBuildingById, getBuildings } from '../services/api';
import { normalizeText } from '../utils/formatters';

export function useBuildings({ search = '', location = 'Semua' } = {}) {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    getBuildings()
      .then((data) => {
        if (isMounted) {
          setBuildings(data);
          setError('');
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Gagal memuat data gedung.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const locations = useMemo(() => {
    return ['Semua', ...new Set(buildings.map((building) => building.lokasi))];
  }, [buildings]);

  const filteredBuildings = useMemo(() => {
    const keyword = normalizeText(search);

    return buildings.filter((building) => {
      const matchesKeyword =
        normalizeText(building.nama).includes(keyword) ||
        normalizeText(building.lokasi).includes(keyword) ||
        normalizeText(building.tipe).includes(keyword);
      const matchesLocation = location === 'Semua' || building.lokasi === location;

      return matchesKeyword && matchesLocation;
    });
  }, [buildings, search, location]);

  return {
    buildings,
    filteredBuildings,
    locations,
    loading,
    error,
  };
}

export function useBuilding(id) {
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    getBuildingById(id)
      .then((data) => {
        if (isMounted) {
          setBuilding(data);
          setError(data ? '' : 'Gedung tidak ditemukan.');
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Gagal memuat detail gedung.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { building, loading, error };
}
