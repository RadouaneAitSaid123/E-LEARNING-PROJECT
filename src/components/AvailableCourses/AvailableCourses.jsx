import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAvailableCourses } from '../../api/availableCoursesApi';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import metaLogo from '../../assets/metaLogo.png';
import ibmLogo from '../../assets/IBMLogo.png';
import penselvLogo from '../../assets/penselvLogo.png';
import californiaLogo from '../../assets/californiaLogo.png';
import googleLogo from '../../assets/googleLogo.png';

const AvailableCoursesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.div`
  display: flex;
  width: 100%;
  max-width: 1159px;
  margin: 50px auto 0px auto;
  padding: 1rem 1rem;
  gap: 2rem;
  align-items: center;
  z-index: 1;
`;

const HeaderTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TabText = styled.h2`
  font-family: 'Fira Sans', sans-serif;
  font-weight: ${props => props.$active ? '700' : '600'};
  font-size: 20px;
  color: ${props => props.$active ? '#0056D2' : '#737373'};
  margin: 0;
  padding: 0.5rem 0;
  cursor: pointer;
  clickable
`;

const TabIndicator = styled.div`
  height: 5px;
  width: 100%;
  background-color: ${props => props.$active ? '#0056D2' : 'transparent'};
  margin-top: 5px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #e0e0e0;
  margin-top: -18px;
  width: 80%;
  z-index: 0;
`;

const SectionTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: #252B42;
  margin: 2rem 0;
  width: 100%;
  max-width: 1159px;
  padding: 0 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1159px;
  margin: 0 auto 1.5rem auto;
  padding: 0 1rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: ${props => props.$active ? '#0056D2' : 'white'};
  color: ${props => props.$active ? 'white' : '#737373'};
  border: 1px solid #BDBDBD;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#004bb9' : '#f5f5f5'};
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1159px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  border: 1px solid #BDBDBD;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 1.5rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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


const CourseProvider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #737373;
  margin-bottom: 0.5rem;
`;

const ProviderLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
`;


const CourseTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #252B42;
  margin: 0.5rem 0;
`;

const CourseDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
  margin: 0;
  margin-bottom: 1.5rem;
`;

const CourseStats = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StatValue = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #252B42;
`;

const StatLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #737373;
`;

const CoursePrice = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #0056D2;
  margin-top: 1rem;
`;

const EnrollButton = styled.button`
  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-end;
  margin-top: 1rem;
  
  &:hover {
    background-color: #004bb9;
  }
`;

const CourseFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #e6f0ff; /* bleu clair comme sur l'image */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;



const AvailableCourses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('availableCourses');
  const [activeFilter, setActiveFilter] = useState('All');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAvailableCourses();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les cours. Veuillez réessayer plus tard.');
        console.error('Erreur lors du chargement des cours:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  // Filtrer les cours selon le filtre actif
  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  // Fonction pour obtenir le logo du fournisseur
  const getProviderLogo = (provider) => {
    if (!provider) return null;
    
    switch (provider.toLowerCase()) {
      case 'meta': return metaLogo;
      case 'ibm': return ibmLogo;
      case 'google': return googleLogo;
      case 'university of california': return californiaLogo;
      case 'university of pennsylvania': return penselvLogo;
      default: return null;
    }
  };

  // Dans la partie rendu du composant, modifiez la structure de la carte :
  return (
    <AvailableCoursesContainer>
      <SectionHeader>
        <HeaderTab>
          <TabText 
            $active={activeTab === 'availableCourses'} 
            onClick={() => handleTabClick('availableCourses')}
          >
            Available Courses
          </TabText>
          <TabIndicator $active={activeTab === 'availableCourses'} />
        </HeaderTab>
      </SectionHeader>
      <Divider />
      
      <SectionTitle>Explore Our Courses</SectionTitle>
      
      <FilterContainer>
        <FilterButton 
          $active={activeFilter === 'All'} 
          onClick={() => handleFilterClick('All')}
        >
          All
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'Programming'} 
          onClick={() => handleFilterClick('Programming')}
        >
          Programming
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'Data Science'} 
          onClick={() => handleFilterClick('Data Science')}
        >
          Data Science
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'Web Development'} 
          onClick={() => handleFilterClick('Web Development')}
        >
          Web Development
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'Business'} 
          onClick={() => handleFilterClick('Business')}
        >
          Business
        </FilterButton>
      </FilterContainer>
      
      {loading ? (
        <LoadingSpinner text="Chargement des cours..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      ) : (
        <CoursesGrid>
          {filteredCourses.map(course => (
            <CourseCard key={course.id} onClick={() => handleCourseClick(course.id)}>
              <CourseProvider>
                {getProviderLogo(course.provider) && (
                  <ProviderLogo src={getProviderLogo(course.provider)} alt={course.provider} />
                )}
                {course.provider}
              </CourseProvider>

              <CourseImage>
              <img 
    src={course.imageUrl ? `http://localhost:8080${course.imageUrl}` : 'https://via.placeholder.com/300x180?text=Pas+d%27image'} 
    alt={course.title} 
  />
                </CourseImage>
                
                <CourseTitle>{course.title}</CourseTitle>
                
                <CourseDescription>
                  {course.description.substring(0, 80)}...
                </CourseDescription>
                
                <CourseStats>
                  <StatItem>
                    <StatValue>{course.duration || '8 weeks'}</StatValue>
                    <StatLabel>Durée</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{course.level || 'Beginner'}</StatValue>
                    <StatLabel>Niveau</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{course.enrolledCount || '15K'}</StatValue>
                    <StatLabel>Étudiants</StatLabel>
                  </StatItem>
                </CourseStats>
                
                <CourseFooter>
                  <CoursePrice>{parseFloat(course.price).toFixed(2)} €</CoursePrice>
                  <EnrollButton>S'inscrire</EnrollButton>
                </CourseFooter>
              </CourseCard>
            ))}
          </CoursesGrid>
        )}
      </AvailableCoursesContainer>
    );
};

export default AvailableCourses;