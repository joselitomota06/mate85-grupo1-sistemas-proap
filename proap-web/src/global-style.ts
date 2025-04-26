import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { css } from '@emotion/react';

export default css`
  body {
    margin: 0;
    padding: 0;
    background-color: #f2f3f6;
  }

  html,
  body,
  #root {
    height: 100%;
  }
`;

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#184a7f',
      light: '#3d71a6',
      dark: '#103259',
    },
    secondary: {
      main: '#e48900',
      light: '#ffa631',
      dark: '#b06c00',
    },
    error: {
      main: '#dc2323',
      light: '#e45a5a',
      dark: '#b01c1c',
    },
    success: {
      main: '#1fb251',
      light: '#4bc574',
      dark: '#158e40',
    },
    background: {
      default: '#f2f3f6',
      paper: '#ffffff',
    },
    grey: {
      50: '#f8f9fa',
      100: '#f2f3f6',
      200: '#eaecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiLink: {
      defaultProps: {
        style: {
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
          },
        },
        contained: {
          '&.Mui-disabled': {
            backgroundColor: '#e0e0e0',
            color: 'rgba(0, 0, 0, 0.38)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 8,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'normal',
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiInputLabel-asterisk': {
            color: '#dc2323',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
          fontWeight: 500,
          '& .MuiFormLabel-asterisk': {
            color: '#dc2323',
          },
          '&.Mui-focused': {
            color: '#184a7f',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#184a7f',
              borderWidth: 1,
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#184a7f',
              borderWidth: 2,
            },
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#dc2323',
            },
          },
        },
        notchedOutline: {
          borderColor: '#ced4da',
          transition: 'all 0.2s ease-in-out',
        },
        input: {
          padding: '12px 14px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#495057',
          borderRadius: 8,

          '& .MuiListItemButton-root': {
            borderRadius: 8,
            padding: '8px 16px',
          },
          '& .MuiButtonBase-root.active': {
            color: '#184a7f',
            backgroundColor: 'rgba(24, 74, 127, 0.08)',
          },
          '& .MuiListItemText-root': {
            marginLeft: 8,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f8f9fa',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation1: {
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

export const theme = createTheme(defaultTheme);
