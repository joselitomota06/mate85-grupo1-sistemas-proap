import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  SolicitationPage,
  EditSolicitationPage,
  ReviewSolicitationPage,
  UsersPage,
} from "../../pages";
import NavigationWrapper from "../navigation/NavigationWrapper";

export default function PrivateRoutes() {
  return (
    <NavigationWrapper>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/solicitation/create' element={<SolicitationPage />} />
        <Route path='/solicitation/edit/:id' element={<EditSolicitationPage />} />
        <Route path='/solicitation/review/:id' element={<ReviewSolicitationPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </NavigationWrapper>
  );
}
