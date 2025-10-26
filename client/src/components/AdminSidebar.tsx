import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  z-index: 1000;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Logo = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  padding: 1rem 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NavLinkStyled = styled(NavLink)`
  display: block;
  padding: 1rem 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
  
  &.active {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.text};
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <Logo>Admin Panel</Logo>
        </SidebarHeader>
        <Nav>
          <NavList>
            <NavItem>
              <NavLinkStyled to="/admin" end onClick={onClose}>
                Dashboard
              </NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/admin/content" onClick={onClose}>
                Content Management
              </NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/admin/menu" onClick={onClose}>
                Menu Management
              </NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/admin/blog" onClick={onClose}>
                Blog Management
              </NavLinkStyled>
            </NavItem>
          </NavList>
        </Nav>
      </SidebarContainer>
    </>
  );
};

export default AdminSidebar;
