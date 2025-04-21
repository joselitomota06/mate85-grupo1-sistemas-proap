import React from 'react';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
  secondaryText?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'primary.main',
  secondaryText,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2.5,
        }}
      >
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 0.5, display: 'block' }}
          >
            {title}
          </Typography>
          <Typography variant="h5" component="div" fontWeight="medium">
            {value}
          </Typography>
          {secondaryText && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: 'block' }}
            >
              {secondaryText}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}15`,
            p: 1.5,
            borderRadius: 2,
            color: color,
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
