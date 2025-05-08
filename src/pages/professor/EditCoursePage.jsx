    import React, { useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import styled from 'styled-components';
    import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
    import CourseForm from '../../components/CourseForm/CourseForm';
    import { getCourseById, updateCourse } from '../../api/courseApi';

    const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    `;

    const Header = styled.div`
    margin-bottom: 2rem;
    `;

    const Title = styled.h1`
    margin: 0;
    color: #333;
    `;

    const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    font-size: 1.2rem;
    color: #666;
    `;

    const ErrorContainer = styled.div`
    padding: 2rem;
    background-color: #ffebee;
    border-radius: 8px;
    color: #c62828;
    margin-bottom: 2rem;
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

    /**
     * @component EditCoursePage
     * @description Page component for editing an existing course
     * @returns {JSX.Element} The course edit page with form for updating course details
     */
    const EditCoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

    // Fetch course data
    const { data: course, isLoading, error } = useQuery({
        queryKey: ['course', id],
        queryFn: () => getCourseById(id),
        staleTime: 300000,
      });
      

    // Update course mutation
    const updateMutation = useMutation({
        mutationFn: (formData) => updateCourse(id, formData),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['course', id] });
          queryClient.invalidateQueries({ queryKey: ['courses'] });
      
          setToast({
            visible: true,
            message: 'Course updated successfully!',
            type: 'success',
          });
      
          setTimeout(() => {
            setToast({ visible: false, message: '', type: 'success' });
            navigate('/professor/courses');
          }, 3000);
        },
        onError: (error) => {
          console.error('Error updating course:', error);
      
          setToast({
            visible: true,
            message: 'Failed to update course. Please try again.',
            type: 'error',
          });
      
          setTimeout(() => {
            setToast({ visible: false, message: '', type: 'error' });
          }, 3000);
        }
      });
      

    const handleSubmit = async (formData) => {
        updateMutation.mutate(formData);
    };

    if (isLoading) {
        return (
        <PageContainer>
            <LoadingContainer>
            <Spinner />
            <LoadingText>Loading course data...</LoadingText>
            </LoadingContainer>
        </PageContainer>
        );
    }

    if (error) {
        return (
        <PageContainer>
            <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <h2>Error</h2>
            <p>{error.message || 'Failed to load course data. Please try again later.'}</p>
            <button onClick={() => navigate('/professor/courses')}>
                Back to Courses
            </button>
            </ErrorContainer>
        </PageContainer>
        );
    }

    return (
        <PageContainer>
        <Header>
            <Title>Edit Course: {course.title}</Title>
        </Header>
        
        <CourseForm 
            initialData={course} 
            courseId={id}
            onSubmit={handleSubmit} 
            isSubmitting={updateMutation.isLoading}
        />
        
        {toast.visible && (
            <Toast type={toast.type}>
            {toast.message}
            </Toast>
        )}
        </PageContainer>
    );
    };

    const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #4a90e2;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    `;

    const LoadingText = styled.p`
    color: #666;
    font-size: 1.2rem;
    margin: 0;
    `;

    const ErrorIcon = styled.div`
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #c62828;
    `;

    export default EditCoursePage;