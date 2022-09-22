import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { RegisterPage, LoginPage, RecoverPassword } from '../../pages'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='*' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='recover-password' element={<RecoverPassword />} />
    </Routes>
  )
}
