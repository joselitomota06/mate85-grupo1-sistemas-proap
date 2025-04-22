import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

interface DeleteUserComponentProps {
  onSubmit: () => void;
  userEmail: string;
}

export default function DeleteUserComponent({
  onSubmit,
  userEmail,
}: DeleteUserComponentProps) {
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(event.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (confirmEmail !== userEmail) {
      setError('O email digitado não corresponde ao email do usuário');
      return;
    }

    onSubmit();
  };

  return (
    <Box>
      <Alert severity="error" sx={{ mb: 2 }}>
        Atenção: Esta ação não pode ser revertida. O usuário será
        permanentemente removido do sistema e todas as suas informações serão
        perdidas.
      </Alert>

      <Typography variant="body2" gutterBottom>
        Para confirmar a exclusão, digite o email do usuário:{' '}
        <strong>{userEmail}</strong>
      </Typography>

      <TextField
        label="Confirme o email do usuário"
        fullWidth
        value={confirmEmail}
        onChange={handleEmailChange}
        error={!!error}
        helperText={error}
        sx={{ mt: 2 }}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          disabled={confirmEmail !== userEmail}
          variant="contained"
          color="error"
          onClick={handleSubmit}
        >
          Excluir Usuário
        </Button>
      </Box>
    </Box>
  );
}
