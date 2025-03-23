import { PropsWithChildren } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { AddRounded, AdminPanelSettings, Group } from '@mui/icons-material';

import MobileNavigationWrapper from './MobileNavigationWrapper';
import useHasPermission from '../../hooks/auth/useHasPermission';

export interface NavigationItem {
  label: string;
  link: string;
  visible: boolean;
  icon?: React.ReactElement;
}

export const NavigationWrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userCanViewPage = useHasPermission('VIEW_USER');
  const isAdmin = useHasPermission('ADMIN_ROLE');

  const navigationItems: NavigationItem[] = [
    {
      label: 'Página Inicial',
      icon: <HomeIcon />,
      link: '/',
      visible: true,
    },
    {
      label: 'Usuários cadastrados',
      icon: <Group />,
      link: '/users',
      visible: userCanViewPage,
    },
    {
      label: 'Painel Administrativo',
      icon: <AdminPanelSettings />,
      link: '/admin-panel',
      visible: isAdmin,
    },
  ];

  return (
    <MobileNavigationWrapper items={navigationItems}>
      {children}
    </MobileNavigationWrapper>
  );
};

export default NavigationWrapper;
