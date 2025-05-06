import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../../assets/faviconLogo.png';
import logoRegister from '../../assets/logoRegister.png';

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F9F9F9;
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: #0056D2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const WelcomeText = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SubText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 80%;
`;

const IllustrationImage = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 10px;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion ici
    console.log('Form submitted:', formData);
    // Rediriger vers le tableau de bord
    navigate('/my-courses');
  };
  
  return (
    <LoginContainer>
      <LeftPanel>
        <WelcomeText>Bienvenue sur E-Learning</WelcomeText>
        <SubText>
          Connectez-vous à votre compte pour accéder à vos cours et continuer votre apprentissage.
        </SubText>
        <IllustrationImage>
          <img src={logoRegister} alt="Illustration" />
        </IllustrationImage>
      </LeftPanel>
      
      <RightPanel>
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
                value={formData.email}
                onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  required
                />
                <PasswordToggle type="button" onClick={toggleShowPassword}>
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
            
            <LoginButton type="submit">
              Se connecter
            </LoginButton>
          </form>
          
          <OrDivider>
            <span>ou</span>
          </OrDivider>
          
          <SocialButtonsContainer>
            <SocialButton>
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </SocialButton>
            <SocialButton>
              <FontAwesomeIcon icon={faFacebook} />
              Facebook
            </SocialButton>
            <SocialButton>
              <FontAwesomeIcon icon={faApple} />
              Apple
            </SocialButton>
          </SocialButtonsContainer>
          
          <RegisterText>
            Vous n'avez pas de compte? <RegisterLink to="/register">S'inscrire</RegisterLink>
          </RegisterText>
        </FormContainer>
      </RightPanel>
    </LoginContainer>
  );
};

export default Login;