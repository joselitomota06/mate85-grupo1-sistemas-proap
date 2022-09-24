import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages";
import RegisterPage from "../../pages/register/RegisterPage";
import SolicitationPage from "../../pages/solicitation/SolicitationPage";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="solicitation" element={<SolicitationPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
