import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { enrollmentService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const CheckoutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
`;

const CheckoutTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #252B42;
  margin-bottom: 2rem;
`;

const CheckoutContent = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CheckoutForm = styled.div`
  flex: 2;
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const CourseDetails = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #252B42;
  margin-bottom: 1.5rem;
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
  color: #252B42;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #0056D2;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #252B42;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #0056D2;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PaymentOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PaymentOption = styled.div`
  flex: 1;
  border: 2px solid ${props => props.selected ? '#0056D2' : '#E0E0E0'};
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.selected ? 'rgba(0, 86, 210, 0.05)' : 'white'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #0056D2;
  }
`;

const PaymentIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.selected ? '#0056D2' : '#737373'};
`;

const PaymentText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.selected ? '#0056D2' : '#252B42'};
`;

const CourseImage = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CourseTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #252B42;
  margin-bottom: 0.5rem;
`;

const CourseProvider = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #737373;
  margin-bottom: 1.5rem;
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #737373;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E0E0E0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #252B42;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: ${props => props.disabled ? '#B3C7E6' : '#0056D2'};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.disabled ? '#B3C7E6' : '#004bb9'};
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #737373;
  justify-content: center;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #252B42;
  
  svg {
    color: #21B84A;
  }
`;

const CourseCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // Récupérer les informations du cours depuis l'état de navigation
  const course = location.state?.course || {
    id: 1,
    title: 'Introduction à la Programmation Java',
    provider: 'Université de Pennsylvanie',
    image: 'https://via.placeholder.com/300x150',
    price: '49,99 €',
    originalPrice: '69,99 €'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Vous devez être connecté pour vous inscrire à un cours');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      // Simuler un délai de traitement du paiement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enregistrer l'inscription au cours
      await enrollmentService.enrollInCourse(course.id);
      
      // Rediriger vers la page des cours de l'utilisateur
      alert('Paiement traité avec succès! Vous êtes maintenant inscrit au cours.');
      navigate('/my-courses');
    } catch (error) {
      console.error('Erreur lors de l\'inscription au cours:', error);
      setError('Une erreur est survenue lors de l\'inscription au cours. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutTitle>Finaliser votre achat</CheckoutTitle>
      
      <CheckoutContent>
        <CheckoutForm>
          <SectionTitle>Informations personnelles</SectionTitle>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <FormLabel>Prénom</FormLabel>
                <FormInput type="text" required />
              </FormGroup>
              <FormGroup>
                <FormLabel>Nom</FormLabel>
                <FormInput type="text" required />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" required />
            </FormGroup>
            
            <SectionTitle>Mode de paiement</SectionTitle>
            
            <PaymentOptions>
              <PaymentOption 
                selected={paymentMethod === 'card'}
                onClick={() => setPaymentMethod('card')}
              >
                <PaymentIcon selected={paymentMethod === 'card'}>
                  <FontAwesomeIcon icon={faCreditCard} />
                </PaymentIcon>
                <PaymentText selected={paymentMethod === 'card'}>Carte de crédit</PaymentText>
              </PaymentOption>
              
              <PaymentOption 
                selected={paymentMethod === 'paypal'}
                onClick={() => setPaymentMethod('paypal')}
              >
                <PaymentIcon selected={paymentMethod === 'paypal'}>
                  <FontAwesomeIcon icon={faCreditCard} />
                </PaymentIcon>
                <PaymentText selected={paymentMethod === 'paypal'}>PayPal</PaymentText>
              </PaymentOption>
            </PaymentOptions>
            
            {paymentMethod === 'card' && (
              <>
                <FormGroup>
                  <FormLabel>Numéro de carte</FormLabel>
                  <FormInput type="text" placeholder="1234 5678 9012 3456" required />
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel>Date d'expiration</FormLabel>
                    <FormInput type="text" placeholder="MM/AA" required />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Code de sécurité (CVV)</FormLabel>
                    <FormInput type="text" placeholder="123" required />
                  </FormGroup>
                </FormRow>
              </>
            )}
            
            {error && (
              <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            <CheckoutButton type="submit" disabled={isProcessing}>
              <FontAwesomeIcon icon={faLock} />
              {isProcessing ? 'Traitement en cours...' : 'Payer maintenant'}
            </CheckoutButton>
            
            <SecurityNote>
              <FontAwesomeIcon icon={faLock} />
              Paiement sécurisé - Vos données sont protégées
            </SecurityNote>
          </form>
        </CheckoutForm>
        
        <CourseDetails>
          <SectionTitle>Résumé de la commande</SectionTitle>
          
          <CourseImage>
          <img 
    src={course.imageUrl ? `http://localhost:8080${course.imageUrl}` : 'https://via.placeholder.com/300x180?text=Pas+d%27image'} 
    alt={course.title}/>
          </CourseImage>
          
          <CourseTitle>{course.title}</CourseTitle>
          <CourseProvider>{course.provider}</CourseProvider>
          
          <BenefitsList>
            <BenefitItem>
              <FontAwesomeIcon icon={faCheck} />
              Accès à vie au contenu du cours
            </BenefitItem>
            <BenefitItem>
              <FontAwesomeIcon icon={faCheck} />
              Certificat de réussite
            </BenefitItem>
            <BenefitItem>
              <FontAwesomeIcon icon={faCheck} />
              Support des instructeurs
            </BenefitItem>
            <BenefitItem>
              <FontAwesomeIcon icon={faCheck} />
              Ressources téléchargeables
            </BenefitItem>
          </BenefitsList>
          
          <PriceItem>
            <span>Prix original</span>
            <span>{course.originalPrice || course.price}</span>
          </PriceItem>
          
          <PriceItem>
            <span>Réduction</span>
            <span>-20,00 €</span>
          </PriceItem>
          
          <TotalPrice>
            <span>Total</span>
            <span>{course.price}</span>
          </TotalPrice>
        </CourseDetails>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default CourseCheckout;