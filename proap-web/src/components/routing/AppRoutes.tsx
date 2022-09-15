import { BrowserRouter } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import PublicRoutes from './PublicRoutes'

export default function ApplicationRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      {isAuthenticated ? <span>Is Authenticated</span> : <PublicRoutes />}
    </BrowserRouter>
  )
}
