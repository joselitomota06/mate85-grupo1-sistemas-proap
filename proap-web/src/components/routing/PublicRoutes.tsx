import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  RegisterPage,
  RecoverPasswordPage,
  LoginPage,
  HomePage,
} from '../../pages';
import ConfirmRecoverPassword from '../../pages/recover-password/confirm/ConfirmRecoverPassword';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="recover-password" element={<RecoverPasswordPage />} />
      <Route
        path="recover-password/confirm"
        element={<ConfirmRecoverPassword />}
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
