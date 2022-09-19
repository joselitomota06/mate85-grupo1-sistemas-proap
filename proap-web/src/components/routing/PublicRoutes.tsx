import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../../pages'
import RecoverPassword from '../../pages/recover-password/RecoverPassword'
import RegisterPage from '../../pages/register/RegisterPage'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='register' element={<RegisterPage />} />
      <Route path='recover-password' element={<RecoverPassword />} />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  )
}
