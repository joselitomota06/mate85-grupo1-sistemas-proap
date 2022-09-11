import { Button, FormControl, Grid, InputBase, InputLabel } from '@mui/material'
import { RegisterButton } from './RegisterFormContainer.style'

export default function RegisterFormContainer() {
  return (
    <>
      <Grid container direction='column' paddingTop={2} paddingBottom={2}>
        <FormControl variant='standard' margin='normal'>
          <InputLabel htmlFor='email-input'>E-mail</InputLabel>
          <InputBase id='email-input' />
        </FormControl>
        <FormControl variant='standard' margin='normal'>
          <InputLabel htmlFor='phone-input'>Telefone</InputLabel>
          <InputBase id='phone-input' />
        </FormControl>
        <FormControl variant='standard' margin='normal'>
          <InputLabel htmlFor='password-input'>Senha</InputLabel>
          <InputBase id='password-input' />
        </FormControl>
        <FormControl variant='standard' margin='normal'>
          <InputLabel htmlFor='confirm-password-input'>
            Confirmar senha
          </InputLabel>
          <InputBase id='confirm-password-input' />
        </FormControl>
      </Grid>
      <RegisterButton variant='contained'>Criar</RegisterButton>
    </>
  )
}
