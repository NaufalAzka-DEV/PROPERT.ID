import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/api';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getProfile()
      .then((data) => {
        if (isMounted) setProfile(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function saveProfile(nextProfile) {
    setSaving(true);
    const savedProfile = await updateProfile(nextProfile);
    setProfile(savedProfile);
    setSaving(false);
    return savedProfile;
  }

  function persistProfile(nextProfile) {
    setProfile(nextProfile);
    updateProfile(nextProfile);
  }

  return { profile, setProfile, loading, saving, saveProfile, persistProfile };
}
