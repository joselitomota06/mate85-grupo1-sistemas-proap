import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../../pages'
import RegisterPage from '../../pages/register/RegisterPage'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='register' element={<RegisterPage />} />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  )
}
