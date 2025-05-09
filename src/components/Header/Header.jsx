import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../../assets/faviconLogo.png';
import { useState } from 'react';
import Register from '../Register/Register'; 
import Login from '../Login/Login';
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #fff;
  padding: 1rem 0;
  
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1rem;
  justify-content: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0056D2;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  width: 350px;
  margin: auto 2rem auto 2rem;

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
    color: #737373;
    background-color: transparent;
  }

  .search-icon {
    background-color: #0056D2;
    border-radius: 100%;
    width: 24px;    
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-left: 10px;
    padding: 0.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1rem 7rem 0 7rem;
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
  
  &:hover {
    color: #0056D2;
  }
`;

const StyledLogoutButton = styled(NavLink)`
  background-color: #0056D2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #004bb9;
    color: white;
  }
`;

const LogInButton = styled(Link)`
  margin: 0 1rem;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
  
  &:hover {
    color: #0056D2;
  }`;

const SignUpButton = styled(Link)`
  background-color: #0056D2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #004bb9;
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated, isProfessor, logout } = useAuth();
  
  return (
    <>
    <HeaderContainer>
      <NavContainer>
        <Logo>
          <img src={logoImage} alt="E-Learning Logo" width="40" height="40" />
          <LogoText>E-LEARNING</LogoText>
        </Logo>
        
        <SearchBar>
          <input type="text" placeholder="What do you want to learn?" />
          <div className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </SearchBar>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          
          {isAuthenticated ? (
            <>
              {isProfessor ? (
                <>
                  <NavLink to="/professor/dashboard">Dashboard</NavLink>
                  <NavLink to="/professor/courses">Mes cours</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/available-courses">Cours disponibles</NavLink>
                  <NavLink to="/my-courses">My courses</NavLink>
                </>
              )}
              <StyledLogoutButton as="button" onClick={logout}>
                Logout
              </StyledLogoutButton>
            </>
          ) : (
            <>
              <LogInButton onClick={() => setShowLoginModal(true)}>
                Connexion
              </LogInButton>
              <SignUpButton onClick={() => setShowRegisterModal(true)}>
                Inscription
              </SignUpButton>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
    <Divider />
    
    {showRegisterModal && (
      <ModalOverlay onClick={() => setShowRegisterModal(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <Register onClose={() => setShowRegisterModal(false)} />
        </ModalContent>
      </ModalOverlay>
    )}
    
    {showLoginModal && (
      <ModalOverlay onClick={() => setShowLoginModal(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <Login onClose={() => setShowLoginModal(false)} />
        </ModalContent>
      </ModalOverlay>
    )}
    </>
  );
};

export default Header;