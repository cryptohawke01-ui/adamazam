import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const HeaderTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: 500;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #cc3333;
  }
`;

interface AdminHeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick, onLogout }) => {
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  return (
    <HeaderContainer>
      <MenuButton onClick={onMenuClick}>
        ☰
      </MenuButton>
      <HeaderTitle>Admin Dashboard</HeaderTitle>
      <UserSection>
        <UserInfo>
          Welcome, {adminUser.name || 'Admin'}
        </UserInfo>
        <LogoutButton onClick={onLogout}>
          Logout
        </LogoutButton>
      </UserSection>
    </HeaderContainer>
  );
};

export default AdminHeader;
