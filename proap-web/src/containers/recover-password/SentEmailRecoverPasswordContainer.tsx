import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SentEmailRecoverPasswordContainerProps {
  email: string;
}

export default function SentEmailRecoverPasswordContainer({
  email,
}: SentEmailRecoverPasswordContainerProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: 480,
          width: '100%',
          p: isSmallScreen ? 2 : 4,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          E-mail de recuperação enviado com sucesso!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Foi enviado um e-mail para <strong>{email}</strong>. Verifique sua
          caixa de entrada e siga as instruções para redefinir sua senha.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/"
          sx={{ textTransform: 'none' }}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
}
