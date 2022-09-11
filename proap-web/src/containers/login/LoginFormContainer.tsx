import { Button, FormControl, Grid, InputBase, InputLabel } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  PasswordRecoveryTypography,
  RegisterLinkTypography,
} from './LoginFormContainer.style'

export default function LoginFormContainer() {
  return (
    <Grid container direction='column' paddingTop={2} paddingBottom={2}>
      <FormControl variant='standard' margin='normal'>
        <InputLabel htmlFor='bootstrap-input'>E-mail</InputLabel>
        <InputBase id='email-input' />
      </FormControl>
      <FormControl variant='standard' margin='normal'>
        <InputLabel htmlFor='bootstrap-input'>Senha</InputLabel>
        <InputBase id='password-input' />
      </FormControl>
      <PasswordRecoveryTypography>
        <Link to='test'>Recuperar senha</Link>
      </PasswordRecoveryTypography>
      <Button variant='contained'>Entrar</Button>
      <RegisterLinkTypography>
        Se ainda não tem uma conta, <Link to='register'>cadastre-se</Link>
      </RegisterLinkTypography>
    </Grid>
  )
}
