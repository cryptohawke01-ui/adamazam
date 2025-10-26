import React, { useState, useEffect, useRef } from 'react';
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

const MenuList = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #000000;
    padding: 2rem 1rem;
    border-top: 1px solid #333333;
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
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const MenuLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? '#0066cc' : '#ffffff'};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  display: block;
  padding: 0.5rem 0;
  
  &:hover {
    color: #0066cc;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #333333;
    text-align: center;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: #111111;
      color: #0066cc;
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
  color: #ffffff;
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
    color: #0066cc;
  }
  
  @media (min-width: 769px) {
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

const SimpleHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 1, label: 'HOME', url: '/' },
    { id: 2, label: 'ABOUT THE BOOK', url: '/about-the-book' },
    { id: 3, label: 'ABOUT THE AUTHOR', url: '/about-the-author' },
    { id: 4, label: 'BLOG', url: '/blog' },
    { id: 5, label: 'CONTACT US', url: '/contact-us' }
  ];

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
        <MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu" $isOpen={isMenuOpen}>
          <HamburgerLine $isOpen={isMenuOpen} />
          <HamburgerLine $isOpen={isMenuOpen} />
          <HamburgerLine $isOpen={isMenuOpen} />
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default SimpleHeader;
