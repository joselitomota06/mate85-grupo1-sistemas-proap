import React from 'react'
import { useAuth } from '../../hooks/auth'

export default function ApplicationRoutes() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <span>Is Authenticated</span>
  ) : (
    <span>Not Authenticated</span>
  )
}
