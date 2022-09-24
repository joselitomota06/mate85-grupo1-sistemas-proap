import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { RegisterPage, RecoverPasswordPage, LoginPage, HomePage, DashboardPage} from '../../pages'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='register' element={<RegisterPage />} />
      <Route path='recover-password' element={<RecoverPasswordPage />} />
      <Route path='home' element={<HomePage />} />
      <Route path='dashboard' element={<DashboardPage />} />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  )
}
