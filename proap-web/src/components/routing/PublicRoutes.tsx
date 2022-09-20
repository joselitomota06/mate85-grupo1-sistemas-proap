import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { RegisterPage, LoginPage } from '../../pages'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='register' element={<RegisterPage />} />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  )
}
