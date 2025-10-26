import React, { useState, useEffect, useRef } from 'react';
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
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 15px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  z-index: 1001;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const MenuList = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.primary};
    padding: 2rem 1rem;
    border-top: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    gap: 0;
    z-index: 999;
    animation: ${props => props.$isOpen ? 'slideDown 0.3s ease-out' : 'none'};
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MenuItem = styled.li`
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    text-align: center;
  }
`;

const MenuLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? props.theme.colors.accent : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  display: block;
  padding: 0.5rem 0;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    text-align: center;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: ${props => props.theme.colors.surface};
      color: ${props => props.theme.colors.accent};
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const HamburgerLine = styled.span<{ $isOpen: boolean }>`
  width: 20px;
  height: 2px;
  background-color: currentColor;
  transition: all 0.3s ease;
  transform-origin: center;
  
  &:nth-child(1) {
    transform: ${props => props.$isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
  }
  
  &:nth-child(2) {
    opacity: ${props => props.$isOpen ? '0' : '1'};
  }
  
  &:nth-child(3) {
    transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'};
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: menuItems = [] } = useQuery('menuItems', getMenuItems);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <HeaderContainer>
      <Nav ref={menuRef}>
        <Logo to="/">ADAM AZAM</Logo>
        <MenuList $isOpen={isMenuOpen}>
          {menuItems.length > 0 ? (
            menuItems.map((item: any) => (
              <MenuItem key={item.id}>
                <MenuLink 
                  to={item.url} 
                  $isActive={location.pathname === item.url}
                >
                  {item.label}
                </MenuLink>
              </MenuItem>
            ))
          ) : (
            // Fallback menu items if API data is not available
            <>
              <MenuItem>
                <MenuLink to="/" $isActive={location.pathname === "/"}>
                  HOME
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/about-book" $isActive={location.pathname === "/about-book"}>
                  ABOUT THE BOOK
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/about-author" $isActive={location.pathname === "/about-author"}>
                  ABOUT THE AUTHOR
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/blog" $isActive={location.pathname === "/blog"}>
                  BLOG
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/contact" $isActive={location.pathname === "/contact"}>
                  CONTACT US
                </MenuLink>
              </MenuItem>
            </>
          )}
        </MenuList>
        <MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu" $isOpen={isMenuOpen}>
          <HamburgerLine $isOpen={isMenuOpen} />
          <HamburgerLine $isOpen={isMenuOpen} />
          <HamburgerLine $isOpen={isMenuOpen} />
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
