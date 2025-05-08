import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListContainer = styled.div`
  width: 100%;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const CourseImage = styled.div`
  height: 180px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const CourseContent = styled.div`
  padding: 1.5rem;
`;

const CourseTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #333;
`;

const CourseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
`;

const EditButton = styled(Button)`
  background-color: #4a90e2;
  color: white;
  
  &:hover {
    background-color: #3a7bc8;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 2rem;
`;

const EmptyStateTitle = styled.h3`
  margin-bottom: 1rem;
  color: #666;
`;

const EmptyStateText = styled.p`
  color: #888;
  margin-bottom: 1.5rem;
`;

const CreateButton = styled(Link)`
  display: inline-block;
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

const CoursesList = ({ courses, onDelete, isLoading }) => {
  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  if (!courses || courses.length === 0) {
    return (
      <EmptyState>
        <EmptyStateTitle>No Courses Found</EmptyStateTitle>
        <EmptyStateText>You haven't created any courses yet. Get started by creating your first course.</EmptyStateText>
        <CreateButton to="/professor/courses/new">Create Your First Course</CreateButton>
      </EmptyState>
    );
  }

  const handleDeleteClick = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      onDelete(id);
    }
  };

  return (
    <ListContainer>
      <CourseGrid>
        {courses.map(course => (
          <CourseCard key={course.id}>
            <CourseImage src={course.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'} />
            <CourseContent>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseInfo>
                <span>${parseFloat(course.price).toFixed(2)}</span>
                <span>{course.enrolledCount || 0} students enrolled</span>
              </CourseInfo>
              <ButtonGroup>
                <EditButton as={Link} to={`/professor/courses/edit/${course.id}`}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => handleDeleteClick(course.id, course.title)}>
                  Delete
                </DeleteButton>
              </ButtonGroup>
            </CourseContent>
          </CourseCard>
        ))}
      </CourseGrid>
    </ListContainer>
  );
};

export default CoursesList;