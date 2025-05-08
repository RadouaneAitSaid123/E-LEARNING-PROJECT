import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

/**
 * @component ProfessorNav
 * @description Navigation component for professor pages with links to dashboard and courses
 * @returns {JSX.Element} The professor navigation bar
 */
const ProfessorNav = () => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <NavBrand>
        <BrandLink to="/">E-Learning Platform</BrandLink>
        <RoleBadge>Professor</RoleBadge>
      </NavBrand>
      
      <NavLinks>
        <NavItem $isActive={location.pathname === '/professor/dashboard'}>
          <NavLink to="/professor/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem $isActive={location.pathname.includes('/professor/courses')}>
          <NavLink to="/professor/courses">Courses</NavLink>
        </NavItem>
      </NavLinks>
      
      <UserSection>
        <UserAvatar>P</UserAvatar>
        <UserMenu>
          <MenuItem to="/profile">Profile</MenuItem>
          <MenuItem to="/settings">Settings</MenuItem>
          <MenuDivider />
          <MenuItem to="/logout">Logout</MenuItem>
        </UserMenu>
      </UserSection>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;

const BrandLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  
  &:hover {
    color: #4a90e2;
  }
`;

const RoleBadge = styled.span`
  background-color: #4a90e2;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.$isActive ? '#4a90e2' : 'transparent'};
    transition: background-color 0.2s;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: color 0.2s;
  
  &:hover {
    color: #4a90e2;
  }
`;

const UserSection = styled.div`
  position: relative;
  
  &:hover > div {
    display: block;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
`;

const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  display: none;
  z-index: 100;
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MenuDivider = styled.hr`
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #eee;
`;

export default ProfessorNav;