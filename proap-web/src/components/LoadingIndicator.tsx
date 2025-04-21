import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingIndicatorProps {
  message?: string;
}

/**
 * Componente para exibir um indicador de carregamento
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Carregando...',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <CircularProgress size={40} thickness={4} sx={{ mb: 2 }} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;
