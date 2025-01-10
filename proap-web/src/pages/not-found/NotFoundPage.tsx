import { Box, Typography } from '@mui/material';
import React from 'react';

export default function NotFoundPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" fontWeight="bold">
        Página não encontrada
      </Typography>
    </Box>
  );
}
