import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2,
        }}
      >
        {icon}
        <Typography variant="h6" fontWeight="medium">
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
    </>
  );
};

export default SectionHeader;
