import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as C from './styles'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Signup = () => {
  const [cpf, setCpf] = useState('')
  const [namePeople, setNamePeople] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneAlternative, setPhoneAlternative] = useState('')
  const [pass, setpass] = useState('')
  const [passConfirm, setpassConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { signup } = useAuth()

  const handleSignup = () => {
    if (
      !cpf |
      !namePeople |
      !email |
      !pass |
      !passConfirm |
      !phone |
      !phoneAlternative
    ) {
      setError('Preencha todos os campos')
      console.log()
      return
    }

    const res = signup(email, pass)

    if (res) {
      setError(res)
      return
    }

    alert('Usuário cadatrado com sucesso!')
    navigate('/')
  }

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="text"
          placeholder="Cpf"
          value={cpf}
          onChange={e => [setCpf(e.target.value), setError('')]}
        />
        <Input
          type="text"
          placeholder="Nome"
          value={namePeople}
          onChange={e => [setNamePeople(e.target.value), setError('')]}
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => [setEmail(e.target.value), setError('')]}
        />
        <Input
          type="number"
          placeholder="Telefone"
          value={phone}
          onChange={e => [setPhone(e.target.value), setError('')]}
        />

        <Input
          type="number"
          placeholder="Telefone alternativo"
          value={phoneAlternative}
          onChange={e => [setPhoneAlternative(e.target.value), setError('')]}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={e => [setpass(e.target.value), setError('')]}
        />

        <Input
          type="password"
          placeholder="Confirme sua senha"
          value={passConfirm}
          onChange={e => [setpassConfirm(e.target.value), setError('')]}
        />

        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  )
}

export default Signup
