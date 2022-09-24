import { BrowserRouter } from 'react-router-dom'
import { useAuth } from '../../hooks'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

export default function ApplicationRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  )
}
