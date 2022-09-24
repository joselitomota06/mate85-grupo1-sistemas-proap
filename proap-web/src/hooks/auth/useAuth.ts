import React from 'react'
import { useSelector } from 'react-redux'

import { IRootState } from '../../store'
import { decodeToken } from '../../helpers/auth'

export default function useAuth() {
  const { isAuthenticated, token } = useSelector(
    (state: IRootState) => state.auth
  )

  const { name, email } = decodeToken(token)

  return {
    isAuthenticated,
    email,
    name,
  }
}
