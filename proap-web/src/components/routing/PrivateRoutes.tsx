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
  AdminPanelPage,
} from '../../pages';

import NavigationWrapper from '../navigation/NavigationWrapper';
import UserProfilePage from '../../pages/user-profile/UserProfilePage';
import ViewSolicitationPage from '../../pages/view-solicitation/ViewSolicitationPage';
import ViewExtraSolicitationPage from '../../pages/view-extra-solicitation/ViewExtraSolicitationPage';
import BudgetDashboardPage from '../../pages/admin-panel/BudgetDashboardPage';
import useHasPermission from '../../hooks/auth/useHasPermission';

export default function PrivateRoutes() {
  const isAdmin = useHasPermission('ADMIN_ROLE');
  const isCeapg = useHasPermission('CEAPG_ROLE');

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
          path="/extra-solicitation/view/:id"
          element={<ViewExtraSolicitationPage />}
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
        {isAdmin && <Route path="/admin-panel" element={<AdminPanelPage />} />}
        {(isAdmin || isCeapg) && (
          <Route path="/budget-dashboard" element={<BudgetDashboardPage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </NavigationWrapper>
  );
}
