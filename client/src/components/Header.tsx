import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getMenuItems } from '../services/api';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.primary};
    padding: 1rem;
    border-top: 1px solid ${props => props.theme.colors.border};
  }
`;

const MenuItem = styled.li`
  position: relative;
`;

const MenuLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? props.theme.colors.accent : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
    font-size: 1.5rem;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { data: menuItems = [] } = useQuery('menuItems', getMenuItems);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">ADAM AZAM</Logo>
        <MenuList isOpen={isMenuOpen}>
          {menuItems.map((item: any) => (
            <MenuItem key={item.id}>
              <MenuLink 
                to={item.url} 
                $isActive={location.pathname === item.url}
              >
                {item.label}
              </MenuLink>
            </MenuItem>
          ))}
        </MenuList>
        <MobileMenuButton onClick={toggleMenu}>
          ☰
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
