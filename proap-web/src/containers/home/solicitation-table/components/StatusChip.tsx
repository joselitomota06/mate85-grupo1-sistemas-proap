import React from 'react';
import { Chip, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface StatusChipProps {
  status: number;
}

/**
 * Component for displaying solicitation status as a chip with an icon
 */
const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const getStatusColor = () => {
    if (status === 1) return 'success';
    if (status === 2) return 'error';
    return 'warning';
  };

  const getStatusText = () => {
    if (status === 1) return 'Aprovada';
    if (status === 2) return 'Não aprovada';
    return 'Pendente';
  };

  const getStatusIcon = () => {
    if (status === 1) return <CheckCircleIcon fontSize="small" />;
    if (status === 2) return <CancelIcon fontSize="small" />;
    return <HourglassEmptyIcon fontSize="small" />;
  };

  return (
    <Chip
      icon={getStatusIcon()}
      label={getStatusText()}
      color={getStatusColor()}
      size="small"
      variant="outlined"
      sx={{
        borderWidth: 1,
        fontWeight: 500,
        '&.MuiChip-colorSuccess': {
          backgroundColor: alpha('#4caf50', 0.08),
          borderColor: alpha('#4caf50', 0.3),
          color: '#2e7d32',
          '& .MuiChip-icon': {
            color: '#2e7d32',
          },
        },
        '&.MuiChip-colorError': {
          backgroundColor: alpha('#f44336', 0.08),
          borderColor: alpha('#f44336', 0.3),
          color: '#d32f2f',
          '& .MuiChip-icon': {
            color: '#d32f2f',
          },
        },
        '&.MuiChip-colorWarning': {
          backgroundColor: alpha('#ff9800', 0.08),
          borderColor: alpha('#ff9800', 0.3),
          color: '#ed6c02',
          '& .MuiChip-icon': {
            color: '#ed6c02',
          },
        },
      }}
    />
  );
};

export default StatusChip;
