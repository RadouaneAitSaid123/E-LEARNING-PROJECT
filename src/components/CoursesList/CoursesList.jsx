import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

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
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  background-color: #0056D2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #004bb9;
    color: white;
  }
`;

const DeleteButton = styled(Button)`
  
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5);
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
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #357ab8;
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: ${props => props.$active ? '#0056D2' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#004bb9' : '#f5f5f5'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CoursesList = ({ courses, onDelete, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  if (isLoading) {
    return <LoadingSpinner text="Chargement des cours..." />;
  }

  if (!courses || courses.length === 0) {
    return (
      <EmptyState>
        <EmptyStateTitle>Aucun cours trouvé</EmptyStateTitle>
        <EmptyStateText>Vous n'avez pas encore créé de cours. Commencez par créer votre premier cours.</EmptyStateText>
        <CreateButton to="/professor/courses/new">Créer votre premier cours</CreateButton>
      </EmptyState>
    );
  }

  const handleDeleteClick = (id, title) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ? Cette action ne peut pas être annulée.`)) {
      onDelete(id);
    }
  };

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ListContainer>
      <CourseGrid>
        {currentCourses.map(course => (
          <CourseCard key={course.id}>
             <CourseImage>
                <img 
    src={course.imageUrl ? `http://localhost:8080${course.imageUrl}` : 'https://via.placeholder.com/300x180?text=Pas+d%27image'} 
    alt={course.title} 
  />
                </CourseImage>
            <CourseContent>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseInfo>
                <span>${parseFloat(course.price).toFixed(2)}</span>
                <span>{course.enrolledCount || 0} étudiants inscrits</span>
              </CourseInfo>
              <ButtonGroup>
                <EditButton as={Link} to={`/professor/courses/edit/${course.id}`}>
                  Modifier
                </EditButton>
                <DeleteButton onClick={() => handleDeleteClick(course.id, course.title)}>
                  Supprimer
                </DeleteButton>
              </ButtonGroup>
            </CourseContent>
          </CourseCard>
        ))}
      </CourseGrid>

      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </PageButton>
          
          {[...Array(totalPages).keys()].map(number => (
            <PageButton
              key={number + 1}
              $active={currentPage === number + 1}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </PageButton>
          ))}
          
          <PageButton 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </PageButton>
        </PaginationContainer>
      )}
    </ListContainer>
  );
};

export default CoursesList;