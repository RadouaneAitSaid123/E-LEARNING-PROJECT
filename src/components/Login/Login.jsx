import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../../assets/faviconLogo.png';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import apple from '../../assets/apple.png';
import { useAuth } from '../../contexts/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  padding: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
`;

const LogoText = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: #0056D2;
`;

const FormTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #252B42;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #737373;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  
  &:focus {
    outline: none;
    border-color: #0056D2;
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #737373;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
`;

const ForgotPassword = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #0056D2;
  text-decoration: none;
  margin-left: auto;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RememberForgotContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #004bb9;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &:before, &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #E0E0E0;
  }
  
  span {
    margin: 0 1rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #737373;
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  padding: 0.75rem 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #252B42;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #F5F5F5;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const RegisterText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
  text-align: center;
`;

const RegisterLink = styled(Link)`
  color: #0056D2;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('student'); // Ajout du rôle
  const navigate = useNavigate();
const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simuler une connexion réussie
    const userData = {
      email,
      role, // Inclure le rôle sélectionné
      name: email.split('@')[0] // Nom d'utilisateur simple basé sur l'email
    };
    
    login(userData);
    
    // Rediriger en fonction du rôle
    if (role === 'professor') {
      navigate('/professor/courses');
    } else {
      navigate('/my-courses');
    }
  };

  return (
    <LoginContainer>
        <Logo>
          <img src={logoImage} alt="E-Learning Logo" width="40" height="40" />
          <LogoText>E-LEARNING</LogoText>
        </Logo>
        
        <FormContainer>
          <FormTitle>Connexion</FormTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="email">Adresse e-mail</FormLabel>
              <FormInput 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse e-mail"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <PasswordInputContainer>
                <FormInput 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  required
                />
                <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </PasswordToggle>
              </PasswordInputContainer>
            </FormGroup>
            
            <RememberForgotContainer>
              <CheckboxContainer>
                <CheckboxInput 
                  type="checkbox" 
                  id="rememberMe" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <CheckboxLabel htmlFor="rememberMe">
                  Se souvenir de moi
                </CheckboxLabel>
              </CheckboxContainer>
              
              <ForgotPassword to="/forgot-password">
                Mot de passe oublié?
              </ForgotPassword>
            </RememberForgotContainer>
            
            {/* Ajout de la sélection de rôle */}
            <FormGroup>
              <FormLabel>Rôle</FormLabel>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #E0E0E0',
                  borderRadius: '5px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  color: '#737373',
                  backgroundColor: 'rgb(255, 255, 255)',
                  '&:focus': {
                    outline: 'none',
                    borderColor: '#0056D2',
                  },
                }}
              >
                <option value="student">Étudiant</option>
                <option value="professor">Professeur</option>
              </select>
            </FormGroup>
            
            <LoginButton type="submit">Se connecter</LoginButton>
          </form>
          
          <OrDivider>
            <span>ou</span>
          </OrDivider>
          
          <SocialButtonsContainer>
            <SocialButton>
              <img src={google} alt='Google'></img>
              Google
            </SocialButton>
            <SocialButton>
            <img src={facebook} alt='Facebook'></img>
              Facebook
            </SocialButton>
            <SocialButton>
            <img src={apple} alt='Apple'></img>
              Apple
            </SocialButton>
          </SocialButtonsContainer>
          
          <RegisterText>
            Vous n'avez pas de compte? <RegisterLink to="/register">S'inscrire</RegisterLink>
          </RegisterText>
        </FormContainer>
    </LoginContainer>
  );
};

export default Login;