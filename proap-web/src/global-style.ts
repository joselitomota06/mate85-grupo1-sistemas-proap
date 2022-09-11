import { createTheme } from '@mui/material'
import { deepmerge } from '@mui/utils'
import { css } from '@emotion/react'

export default css`
  body {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }
`

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
})

const customFieldLabelTheme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        style: {
          textDecoration: 'none',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          'label + &': {
            marginTop: defaultTheme.spacing(3),
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
  },
})

export const theme = createTheme(deepmerge(customFieldLabelTheme, defaultTheme))
