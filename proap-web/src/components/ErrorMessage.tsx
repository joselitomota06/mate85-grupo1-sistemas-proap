import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorMessageProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
}

/**
 * Componente para exibir mensagens de erro
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  actionText,
  onAction,
}) => {
  return (
    <Paper
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 2,
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Ocorreu um erro
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {message}
      </Typography>
      {actionText && onAction && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAction}
          sx={{ mt: 2 }}
        >
          {actionText}
        </Button>
      )}
    </Paper>
  );
};

export default ErrorMessage;
