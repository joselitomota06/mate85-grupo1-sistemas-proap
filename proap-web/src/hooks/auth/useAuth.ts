import React from 'react'
import { useSelector } from 'react-redux'

import { IRootState } from '../../store'

export default function useAuth() {
  const { isAuthenticated } = useSelector((state: IRootState) => state.auth)

  return {
    isAuthenticated,
  }
}
