import { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  SelectChangeEvent,
  FormHelperText,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import { ProfileRole } from '../../types';

interface ProfileSelectionComponentProps {
  profiles: ProfileRole[];
  currentProfile: string;
  onSubmit: (profile: ProfileRole) => void;
}

export default function ProfileSelectionComponent({
  profiles,
  currentProfile,
  onSubmit,
}: ProfileSelectionComponentProps) {
  const noProfile = profiles.find((p) => p.permissions.length === 0);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (currentProfile) {
      setSelectedProfile(currentProfile);
    }
  }, [currentProfile]);

  const handleProfileChange = (event: SelectChangeEvent) => {
    setSelectedProfile(event.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedProfile) {
      setError('Por favor, selecione um perfil');
      return;
    }

    const profile = profiles.find((p) => p.name === selectedProfile);
    if (profile) {
      onSubmit(profile);
    } else {
      setError('Perfil selecionado não encontrado');
    }
  };

  if (profiles.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body2" gutterBottom>
        Selecione o novo perfil para o usuário:
      </Typography>

      <FormControl fullWidth error={!!error} sx={{ mt: 2 }}>
        <InputLabel id="profile-select-label">Perfil</InputLabel>
        <Select
          labelId="profile-select-label"
          id="profile-select"
          value={selectedProfile}
          label="Perfil"
          onChange={handleProfileChange}
        >
          {profiles.map((profile) => (
            <MenuItem key={profile.name} value={profile.name}>
              {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
      {selectedProfile === noProfile?.name && (
        <Box sx={{ mt: 2 }}>
          <Alert
            severity="warning"
            variant="outlined"
            sx={{
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <AlertTitle sx={{ fontWeight: 'bold' }}>Atenção!</AlertTitle>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Este perfil revoga todas as permissões do usuário, incluindo a
              abertura de novas solicitações. É ideal para revogar atribuições
              administrativas ou aplicar sanções a um usuário específico.
            </Typography>
            <Typography variant="body2">
              O usuário poderá acessar o sistema e acompanhar o status de suas
              solicitações já existentes.
            </Typography>
          </Alert>
        </Box>
      )}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={selectedProfile === currentProfile}
        >
          Atualizar Perfil
        </Button>
      </Box>
    </Box>
  );
}
