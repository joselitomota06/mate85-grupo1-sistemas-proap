import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../../pages'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='*' element={<LoginPage />} />
    </Routes>
  )
}
