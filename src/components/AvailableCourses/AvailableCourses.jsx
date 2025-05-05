import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import javaImage from '../../assets/myCoursesImage.png';
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
  font-weight: ${props => props.active ? '700' : '600'};
  font-size: 20px;
  color: ${props => props.active ? '#0056D2' : '#737373'};
  margin: 0;
  padding: 0.5rem 0;
  cursor: pointer;
  clickable
`;

const TabIndicator = styled.div`
  height: 5px;
  width: 100%;
  background-color: ${props => props.active ? '#0056D2' : 'transparent'};
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
  background-color: ${props => props.active ? '#0056D2' : 'white'};
  color: ${props => props.active ? 'white' : '#737373'};
  border: 1px solid #BDBDBD;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#004bb9' : '#f5f5f5'};
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
  box-shadow: 0px 0px 4px 2px rgba(189, 189, 189, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CourseImage = styled.div`
  height: 180px;
  width: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CourseContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const CourseProvider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #737373;
  margin: 0;
`;
const ProviderLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const CourseTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #252B42;
  margin: 0.5rem 0;
  min-height: 50px;
`;

const CourseDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
  margin: 0;
  flex: 1;
`;

const CourseStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E0E0E0;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CourseFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #F9F9F9;
  border-top: 1px solid #E0E0E0;
`;

const CoursePrice = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #0056D2;
`;

const EnrollButton = styled.button`
  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #004bb9;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.active ? '#0056D2' : 'white'};
  color: ${props => props.active ? 'white' : '#737373'};
  border: 1px solid #BDBDBD;
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#004bb9' : '#f5f5f5'};
  }
`;

// Données simulées pour les cours disponibles
const availableCoursesData = [
  {
    id: 1,
    title: 'Introduction à la Programmation Java',
    provider: 'Université de Pennsylvanie',
    providerLogo: penselvLogo,
    image: javaImage,
    description: 'Apprenez les bases de la programmation orientée objet avec Java dans ce cours complet.',
    duration: '8 semaines',
    level: 'Débutant',
    students: '15K',
    price: '49,99 €'
  },
  {
    id: 2,
    title: 'Développement Front-End avec React',
    provider: 'Meta',
    providerLogo: metaLogo,
    image: javaImage,
    description: 'Maîtrisez React et créez des interfaces utilisateur modernes et réactives.',
    duration: '10 semaines',
    level: 'Intermédiaire',
    students: '12K',
    price: '59,99 €'
  },
  {
    id: 3,
    title: 'Science des Données et Big Data',
    provider: 'IBM',
    providerLogo: ibmLogo,
    image: javaImage,
    description: 'Explorez les concepts fondamentaux de la science des données et du big data.',
    duration: '12 semaines',
    level: 'Avancé',
    students: '8K',
    price: '69,99 €'
  },
  {
    id: 4,
    title: 'Anglais des Affaires',
    provider: 'Université de Californie',
    providerLogo: californiaLogo,
    image: javaImage,
    description: 'Améliorez vos compétences en anglais pour le monde professionnel et des affaires.',
    duration: '6 semaines',
    level: 'Intermédiaire',
    students: '20K',
    price: '39,99 €'
  },
  {
    id: 5,
    title: 'HTML, CSS et JavaScript pour Débutants',
    provider: 'IBM',
    providerLogo: ibmLogo,
    image: javaImage,
    description: 'Commencez votre parcours de développeur web avec les technologies fondamentales.',
    duration: '8 semaines',
    level: 'Débutant',
    students: '25K',
    price: '44,99 €'
  },
  {
    id: 6,
    title: 'Intelligence Artificielle et Machine Learning',
    provider: 'Google',
    providerLogo: googleLogo,
    image: javaImage,
    description: 'Découvrez les principes et applications de l\'IA et du machine learning.',
    duration: '14 semaines',
    level: 'Avancé',
    students: '10K',
    price: '79,99 €'
  }
];

const AvailableCourses = () => {
  const navigate = useNavigate();
  
  const handleEnrollClick = (course) => {
    navigate('/course-checkout', { state: { course } });
  };
  const navToMeCourses = () => {
    navigate('/my-courses');
  };
  
  return (
    <AvailableCoursesContainer>
      <SectionHeader>
       
        <HeaderTab>
          <TabText active={true}>Available courses</TabText>
          <TabIndicator active={true} />
        </HeaderTab>
        <HeaderTab>
        <TabText onClick={() =>navToMeCourses()} active={false}>My courses</TabText>
          <TabIndicator active={false} />
        </HeaderTab>
      </SectionHeader>
      
      <Divider />
      
      <SectionTitle>Explorez nos cours</SectionTitle>
      
      <FilterContainer>
        <FilterButton active={true}>Tous</FilterButton>
        <FilterButton>Développement Web</FilterButton>
        <FilterButton>Science des Données</FilterButton>
        <FilterButton>Business</FilterButton>
        <FilterButton>Design</FilterButton>
        <FilterButton>Marketing</FilterButton>
      </FilterContainer>
      
      <CoursesGrid>
        {availableCoursesData.map(course => (
          <CourseCard key={course.id}>
            <CourseImage>
              <img src={course.image} alt={course.title} />
            </CourseImage>
            <CourseContent>
              <CourseProvider>
                <ProviderLogo src={course.providerLogo} alt={course.provider}>
                 
                </ProviderLogo>
                {course.provider}
                </CourseProvider>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseStats>
                <StatItem>
                  <StatValue>{course.duration}</StatValue>
                  <StatLabel>Durée</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{course.level}</StatValue>
                  <StatLabel>Niveau</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{course.students}</StatValue>
                  <StatLabel>Étudiants</StatLabel>
                </StatItem>
              </CourseStats>
            </CourseContent>
            <CourseFooter>
              <CoursePrice>{course.price}</CoursePrice>
              <EnrollButton onClick={() => handleEnrollClick(course)}>S'inscrire</EnrollButton>
            </CourseFooter>
          </CourseCard>
        ))}
      </CoursesGrid>
      
      <PaginationContainer>
        <PageButton active={true}>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>4</PageButton>
        <PageButton>5</PageButton>
      </PaginationContainer>
    </AvailableCoursesContainer>
  );
};

export default AvailableCourses;