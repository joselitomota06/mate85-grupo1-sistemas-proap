import {
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  LoginButton,
  PasswordRecoveryTypography,
  RegisterLinkTypography,
} from './LoginFormContainer.style'

export default function LoginFormContainer() {
  return (
    <>
      <Grid container direction='column' paddingTop={2} paddingBottom={2}>
        <TextField label='E-mail' name='email' />
        <TextField label='Senha' name='password' />
        <PasswordRecoveryTypography>
          <Link to='test'>Recuperar senha</Link>
        </PasswordRecoveryTypography>
      </Grid>
      <LoginButton variant='contained'>Entrar</LoginButton>
      <RegisterLinkTypography>
        Se ainda não tem uma conta, <Link to='register'>cadastre-se</Link>
      </RegisterLinkTypography>
    </>
  )
}
