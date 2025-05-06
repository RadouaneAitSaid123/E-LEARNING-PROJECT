import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../../assets/faviconLogo.png';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import apple from '../../assets/apple.png';


const RegisterContainer = styled.div`
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
  color:rgb(0, 0, 0);
  background-color:rgb(255, 255, 255);

  
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

const TermsLink = styled.span`
  color: #0056D2;
  cursor: pointer;
`;

const RegisterButton = styled.button`
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
  
  &:disabled {
    background-color: #B3C7E6;
    cursor: not-allowed;
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

const LoginText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
  text-align: center;
`;

const LoginLink = styled(Link)`
  color: #0056D2;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PasswordRequirements = styled.div`
  margin-top: 0.5rem;
`;

const Requirement = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${props => props.met ? '#21B84A' : '#737373'};
  margin-bottom: 0.25rem;
`;

const RequirementIcon = styled.span`
  color: ${props => props.met ? '#21B84A' : '#737373'};
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
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
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'inscription ici
    console.log('Form submitted:', formData);
    // Rediriger vers la page de connexion ou le tableau de bord
    navigate('/my-courses');
  };
  
  // Vérification des exigences du mot de passe
  const hasMinLength = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';
  
  // Vérifier si le formulaire est valide
  const isFormValid = 
    formData.fullName.trim() !== '' && 
    formData.email.trim() !== '' && 
    hasMinLength && 
    hasUpperCase && 
    hasLowerCase && 
    hasNumber && 
    hasSpecialChar && 
    passwordsMatch && 
    agreeTerms;
  
  return (
    <RegisterContainer>
        <Logo>
          <img src={logoImage} alt="E-Learning Logo" width="40" height="40" />
          <LogoText>E-LEARNING</LogoText>
        </Logo>
        
        <FormContainer>
          <FormTitle>Créer un compte</FormTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="fullName">Nom complet</FormLabel>
              <FormInput 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Entrez votre nom complet"
                required
              />
            </FormGroup>
            
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
                  placeholder="Créez un mot de passe"
                  required
                />
                <PasswordToggle type="button" onClick={toggleShowPassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </PasswordToggle>
              </PasswordInputContainer>
              
              <PasswordRequirements>
                <Requirement met={hasMinLength}>
                  <RequirementIcon met={hasMinLength}>
                    <FontAwesomeIcon icon={hasMinLength ? faCheck : null} />
                  </RequirementIcon>
                  Au moins 8 caractères
                </Requirement>
                <Requirement met={hasUpperCase}>
                  <RequirementIcon met={hasUpperCase}>
                    <FontAwesomeIcon icon={hasUpperCase ? faCheck : null} />
                  </RequirementIcon>
                  Au moins une majuscule
                </Requirement>
                <Requirement met={hasLowerCase}>
                  <RequirementIcon met={hasLowerCase}>
                    <FontAwesomeIcon icon={hasLowerCase ? faCheck : null} />
                  </RequirementIcon>
                  Au moins une minuscule
                </Requirement>
                <Requirement met={hasNumber}>
                  <RequirementIcon met={hasNumber}>
                    <FontAwesomeIcon icon={hasNumber ? faCheck : null} />
                  </RequirementIcon>
                  Au moins un chiffre
                </Requirement>
                <Requirement met={hasSpecialChar}>
                  <RequirementIcon met={hasSpecialChar}>
                    <FontAwesomeIcon icon={hasSpecialChar ? faCheck : null} />
                  </RequirementIcon>
                  Au moins un caractère spécial
                </Requirement>
              </PasswordRequirements>
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="confirmPassword">Confirmer le mot de passe</FormLabel>
              <PasswordInputContainer>
                <FormInput 
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  required
                />
                <PasswordToggle type="button" onClick={toggleShowConfirmPassword}>
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </PasswordToggle>
              </PasswordInputContainer>
              
              {formData.confirmPassword && !passwordsMatch && (
                <Requirement met={false}>
                  Les mots de passe ne correspondent pas
                </Requirement>
              )}
              
              {formData.confirmPassword && passwordsMatch && (
                <Requirement met={true}>
                  <RequirementIcon met={true}>
                    <FontAwesomeIcon icon={faCheck} />
                  </RequirementIcon>
                  Les mots de passe correspondent
                </Requirement>
              )}
            </FormGroup>
            
            <CheckboxContainer>
              <CheckboxInput 
                type="checkbox" 
                id="agreeTerms" 
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <CheckboxLabel htmlFor="agreeTerms">
                J'accepte les <TermsLink>conditions d'utilisation</TermsLink> et la <TermsLink>politique de confidentialité</TermsLink>
              </CheckboxLabel>
            </CheckboxContainer>
            
            <RegisterButton type="submit" disabled={!isFormValid}>
              S'inscrire
            </RegisterButton>
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
          
          <LoginText>
            Vous avez déjà un compte? <LoginLink to="/login">Se connecter</LoginLink>
          </LoginText>
        </FormContainer>
    </RegisterContainer>
  );
};

export default Register;