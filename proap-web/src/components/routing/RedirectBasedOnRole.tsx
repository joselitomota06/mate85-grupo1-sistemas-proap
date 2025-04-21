import { Navigate } from 'react-router-dom';
import useHasPermission from '../../hooks/auth/useHasPermission';

export default function RedirectBasedOnRole() {
  const isAdmin = useHasPermission('ADMIN_ROLE');
  const isCeapg = useHasPermission('CEAPG_ROLE');

  if (isAdmin) {
    return <Navigate to="/admin-panel" replace />;
  }
  if (isCeapg) {
    return <Navigate to="/ceapg-reviews" replace />;
  }

  return <Navigate to="/home" replace />;
}
