import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { RegisterPage, RecoverPasswordPage, LoginPage } from '../../pages'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='register' element={<RegisterPage />} />
      <Route path='recover-password' element={<RecoverPasswordPage />} />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  )
}
