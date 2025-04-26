import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
  actions?: React.ReactNode;
}

/**
 * Componente de cabeçalho padronizado para páginas
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backUrl,
  actions,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {backUrl !== undefined && (
            <IconButton onClick={handleBack} aria-label="voltar" sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="primary"
          >
            {title}
          </Typography>
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;
