import { useEffect, useState } from 'react';
import { fetchProfiles } from '../../services/profileService';
import { ProfileRole } from '../../types';

export default function useAllProfiles() {
  const [profiles, setProfiles] = useState<ProfileRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchProfiles()
      .then(({ data }) => setProfiles(data))
      .catch((error) => {
        if (error.status === 403) {
          setError('Você não tem permissão para acessar esta página');
        } else {
          setError('Erro ao carregar perfis');
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { profiles, isLoading, error };
}
