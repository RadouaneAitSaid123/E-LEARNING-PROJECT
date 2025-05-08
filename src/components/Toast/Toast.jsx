import React, { useEffect } from 'react';
import styled from 'styled-components';

/**
 * @component Toast
 * @description Displays toast notifications for success, error, info, or warning messages
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display in the toast
 * @param {string} props.type - The type of toast (success, error, info, warning)
 * @param {boolean} props.visible - Whether the toast is visible
 * @param {Function} props.onClose - Function to call when the toast should be closed
 * @param {number} [props.duration=3000] - Duration in milliseconds before auto-closing
 * @returns {JSX.Element|null} The toast notification or null if not visible
 */
const Toast = ({ message, type = 'success', visible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onClose, duration]);
  
  if (!visible) return null;
  
  return (
    <ToastContainer type={type}>
      <ToastIcon type={type}>
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && 'ℹ'}
        {type === 'warning' && '⚠'}
      </ToastIcon>
      <ToastMessage>{message}</ToastMessage>
      <CloseButton onClick={onClose}>×</CloseButton>
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background-color: ${props => {
    switch (props.type) {
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': return '#2196f3';
      default: return '#4caf50';
    }
  }};
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ToastIcon = styled.div`
  margin-right: 0.75rem;
  font-size: 1.2rem;
`;

const ToastMessage = styled.div`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: 0.75rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

export default Toast;