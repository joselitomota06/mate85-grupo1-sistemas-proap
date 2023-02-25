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
    },
    secondary: {
      main: '#e48900',
    },
    error: {
      main: '#dc2323',
    },
    success: {
      main: '#1fb251',
    },
    background: {
      default: '#f2f3f6',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        style: {
          textDecoration: 'none',
        },
      },
    },
  },
});

const customFieldLabelTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'normal',
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '2px',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: false,
      },
      styleOverrides: {
        root: {
          transform: 'translate(2px, -8px) scale(0.75)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          'label + &': {
            marginTop: '16px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            display: 'none',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-asterisk': {
            color: 'red',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          'label + &': {
            marginTop: defaultTheme.spacing(3),
          },
          '&.Mui-error .MuiInputBase-input, &.Mui-error .MuiInputBase-input:focus':
            {
              borderColor: '#dc2323',
            },
          '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor:
              defaultTheme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 12px',
            transition: defaultTheme.transitions.create([
              'border-color',
              'background-color',
              'box-shadow',
            ]),
            '&:focus': {
              borderColor: defaultTheme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.grey[700],
          borderRadius: '.5rem',

          '& .MuiListItemButton-root': {
            borderRadius: '.5rem',
            padding: '.25rem 0 .25rem .5rem',
          },
          '& .MuiButtonBase-root.active': {
            color: defaultTheme.palette.primary.main,
            backgroundColor: '#d6eaff',
          },
          '& .MuiListItemText-root': {
            marginLeft: '.5rem',
          },
        },
      },
    },
  },
});

export const theme = createTheme(
  deepmerge(customFieldLabelTheme, defaultTheme)
);
