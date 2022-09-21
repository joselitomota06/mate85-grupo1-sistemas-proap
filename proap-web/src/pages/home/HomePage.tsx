import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { useAppDispatch } from '../../store'
import { logout } from '../../store/slices/auth-slice/authSlice'

export default function HomePage() {
  const dispatch = useAppDispatch()

  const { name } = useAuth()

  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <>
      <h1>Bem vindo, {name}!!</h1>
      <h2>Ações úteis:</h2>
      <ul>
        <li>
          <Link to='solicitation/create'>Página da criação de solicitação</Link>
        </li>
        <li>
          <button onClick={handleClick}>Botão de logout</button>
        </li>
      </ul>
    </>
  )
}
