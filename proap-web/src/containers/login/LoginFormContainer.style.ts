import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

export const PasswordRecoveryTypography = styled(Typography)(({ theme }) => ({
  marginBottom: '0.5rem',
  fontWeight: '400',
  textAlign: 'right',
  fontSize: '14px',
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}))

export const RegisterLinkTypography = styled(Typography)(({ theme }) => ({
  margin: '1rem 0',
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.6)',
  '& a': {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: '500',
  },
}))
