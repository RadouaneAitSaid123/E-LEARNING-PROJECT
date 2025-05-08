import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CoursesList from '../../components/CoursesList/CoursesList';
import { getCourses, deleteCourse } from '../../api/courseApi';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const AddButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a7bc8;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

/**
 * @component CoursesListPage
 * @description Page component that displays a list of courses for professors to manage
 * @returns {JSX.Element} The courses list page with options to create, edit, and delete courses
 */
const CoursesListPage = () => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const queryClient = useQueryClient();
  
  // Fetch courses
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    staleTime: 300000, // 5 minutes
  });
  
  
  // Delete course mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCourse, // la fonction mutation
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('courses');
      
      // Show success toast
      setToast({
        visible: true,
        message: 'Course deleted successfully!',
        type: 'success',
      });
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ visible: false, message: '', type: 'success' });
      }, 3000);
    },
    onError: (error) => {
      console.error('Error deleting course:', error);
      
      // Show error toast
      setToast({
        visible: true,
        message: 'Failed to delete course. Please try again.',
        type: 'error',
      });
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ visible: false, message: '', type: 'error' });
      }, 3000);
    }
  });
  

  const handleDelete = async (courseId) => {
    deleteMutation.mutate(courseId);
  };

  return (
    <PageContainer>
      <Header>
        <Title>My Courses</Title>
        <AddButton to="/professor/courses/new">Create New Course</AddButton>
      </Header>

      {error && (
        <ErrorMessage>
          <ErrorIcon>⚠️</ErrorIcon>
          {error.message || 'Failed to load courses. Please try again later.'}
        </ErrorMessage>
      )}

      <CoursesList 
        courses={courses} 
        onDelete={handleDelete} 
        isLoading={isLoading} 
      />
      
      {toast.visible && (
        <Toast type={toast.type}>
          {toast.message}
        </Toast>
      )}
    </PageContainer>
  );
};

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

const ErrorIcon = styled.span`
  margin-right: 0.5rem;
`;

export default CoursesListPage;