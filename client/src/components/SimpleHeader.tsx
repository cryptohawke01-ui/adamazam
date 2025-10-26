import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #000000;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #333333;
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
  color: #ffffff;
  text-decoration: none;
  
  &:hover {
    color: #0066cc;
  }
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  position: relative;
`;

const MenuLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? '#0066cc' : '#ffffff'};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  transition: color 0.3s ease;
  
  &:hover {
    color: #0066cc;
  }
`;

const SimpleHeader: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { id: 1, label: 'HOME', url: '/' },
    { id: 2, label: 'ABOUT THE BOOK', url: '/about-the-book' },
    { id: 3, label: 'ABOUT THE AUTHOR', url: '/about-the-author' },
    { id: 4, label: 'BLOG', url: '/blog' },
    { id: 5, label: 'CONTACT US', url: '/contact-us' }
  ];

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">ADAM AZAM</Logo>
        <MenuList>
          {menuItems.map((item) => (
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
      </Nav>
    </HeaderContainer>
  );
};

export default SimpleHeader;
