import { Box, Typography } from '@mui/material';

export function UnauthorizedPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" fontWeight="bold">
        Acesso não autorizado
      </Typography>
    </Box>
  );
}
