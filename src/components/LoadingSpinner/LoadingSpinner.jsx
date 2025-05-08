import React from 'react';
import styled from 'styled-components';

/**
 * @component LoadingSpinner
 * @description Displays a loading spinner with optional text
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Size of the spinner (small, medium, large)
 * @param {string} [props.color='#4a90e2'] - Color of the spinner
 * @param {string} [props.text] - Optional text to display below the spinner
 * @returns {JSX.Element} The loading spinner component
 */
const LoadingSpinner = ({ size = 'medium', color = '#4a90e2', text }) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} color={color} />
      {text && <SpinnerText>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '36px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '36px';
    }
  }};
  border-radius: 50%;
  border-left-color: ${props => props.color};
  animation: spin 1s linear infinite;
  margin-bottom: ${props => props.text ? '1rem' : '0'};
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SpinnerText = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`;

export default LoadingSpinner;