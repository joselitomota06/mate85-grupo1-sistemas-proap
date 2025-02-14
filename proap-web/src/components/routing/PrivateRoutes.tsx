import { Route, Routes } from 'react-router-dom';
import {
  HomePage,
  NotFoundPage,
  SolicitationPage,
  EditSolicitationPage,
  CreateExtraSolicitationPage,
  EditExtraSolicitationPage,
  ReviewSolicitationPage,
  UsersPage,
} from '../../pages';

import NavigationWrapper from '../navigation/NavigationWrapper';
import UserProfilePage from '../../pages/user-profile/UserProfilePage';
import ViewSolicitationPage from '../../pages/view-solicitation/ViewSolicitationPage';

export default function PrivateRoutes() {
  return (
    <NavigationWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solicitation/create" element={<SolicitationPage />} />
        <Route
          path="/extra-solicitation/create"
          element={<CreateExtraSolicitationPage />}
        />
        <Route
          path="/extra-solicitation/edit/:id"
          element={<EditExtraSolicitationPage />}
        />
        <Route
          path="/solicitation/edit/:id"
          element={<EditSolicitationPage />}
        />
        <Route
          path="/solicitation/review/:id"
          element={<ReviewSolicitationPage />}
        />
        <Route
          path="/solicitation/view/:id"
          element={<ViewSolicitationPage />}
        />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </NavigationWrapper>
  );
}
