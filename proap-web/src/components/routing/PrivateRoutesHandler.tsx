import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

export default function PrivateRoutesHandler() {
  return (
    <Routes>
      <Route path="/register" element={<Navigate to="/home" replace />} />
      <Route
        path="/recover-password"
        element={<Navigate to="/home" replace />}
      />
      <Route
        path="/recover-password/confirm"
        element={<Navigate to="/home" replace />}
      />
      <Route path="*" element={<PrivateRoutes />} />
    </Routes>
  );
}
