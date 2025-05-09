import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CourseForm from '../../components/CourseForm/CourseForm';
import { createCourse } from '../../api/courseApi';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background-color: ${props => props.type === 'error' ? '#f44336' : '#4caf50'};
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
  }
`;

const NewCoursePage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const handleSubmit = async (formData) => {
    try {
      await createCourse(formData);
      
      // Show success toast
      setToast({
        visible: true,
        message: 'Course created successfully!',
        type: 'success'
      });
      
      // Hide toast after 3 seconds and navigate
      setTimeout(() => {
        setToast({ visible: false, message: '', type: 'success' });
        navigate('/professor/courses');
      }, 3000);
    } catch (error) {
      console.error('Error creating course:', error);
      
      // Show error toast
      setToast({
        visible: true,
        message: 'Failed to create course. Please try again.',
        type: 'error'
      });
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ visible: false, message: '', type: 'error' });
      }, 3000);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>Create New Course</Title>
      </Header>
      
      <CourseForm onSubmit={handleSubmit} />
      
      {toast.visible && (
        <Toast type={toast.type}>
          {toast.message}
        </Toast>
      )}
    </PageContainer>
  );
};

export default NewCoursePage;