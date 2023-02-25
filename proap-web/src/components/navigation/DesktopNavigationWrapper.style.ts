import styled from '@emotion/styled';

interface DesktopNavigationListProps {
  width: number;
}

interface DesktopNavigationChildrenWrapperProps {
  navigationWidth: number;
}

export const DesktopNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DesktopNavigationListWrapper = styled.div<DesktopNavigationListProps>`
  width: ${({ width }) => width}px;
`;

export const DesktopNavigationChildrenWrapper = styled.div<DesktopNavigationChildrenWrapperProps>`
  min-height: 100vh;
  width: calc(100% - ${({ navigationWidth }) => navigationWidth}px);
  background-color: white;
`;

export const DesktopNavigationChildrenInner = styled.div`
  padding: 1rem;
`;
