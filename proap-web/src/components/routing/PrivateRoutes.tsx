import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage, NotFoundPage, SolicitationPage } from '../../pages'

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/solicitation/create' element={<SolicitationPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
