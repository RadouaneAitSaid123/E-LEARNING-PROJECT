import React from 'react';
import styled from 'styled-components';

/**
 * @component ErrorMessage
 * @description Displays an error message with optional retry functionality
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 * @param {Function} [props.onRetry] - Optional function to call when retry button is clicked
 * @param {string} [props.title='Error'] - Title of the error message
 * @returns {JSX.Element} The error message component
 */
const ErrorMessage = ({ message, onRetry, title = 'Error' }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          Try Again
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  padding: 2rem;
  background-color: #ffebee;
  border-radius: 8px;
  color: #c62828;
  margin: 2rem auto;
  max-width: 800px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  color: #c62828;
  margin: 0 0 1rem;
`;

const ErrorText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a7bc8;
  }
`;

export default ErrorMessage;