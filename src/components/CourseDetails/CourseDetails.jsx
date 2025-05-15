import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faClock, faUser, faChalkboardTeacher, faGraduationCap, faStar, faChevronDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import javaImage from '../../assets/myCoursesImage.png';
import { courseService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const CourseDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1300px;
  margin: 2rem auto;
  gap: 2rem;
  padding: 0 1rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const CourseImage = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const CourseTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #252B42;
  margin-bottom: 1rem;
`;

const CourseProvider = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #737373;
  margin-bottom: 1.5rem;
`;

const CourseStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatIcon = styled.div`
  color: #0056D2;
`;

const StatText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #737373;
`;

const CourseDescription = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #737373;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #252B42;
  margin-bottom: 1.5rem;
`;

const LearningOutcomes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OutcomeItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const CheckIcon = styled.div`
  color: #21B84A;
  margin-top: 3px;
`;

const OutcomeText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #737373;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PriceCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const PriceValue = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #0056D2;
  margin-bottom: 1.5rem;
`;

const EnrollButton = styled.button`
  width: 100%;
  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #004bb9;
  }
`;

const CourseIncludes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IncludeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IncludeIcon = styled.div`
  color: #0056D2;
`;

const IncludeText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #737373;
`;

const ModulesCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const ModulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModuleItem = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  overflow: hidden;
`;

const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.expanded ? 'rgba(0, 86, 210, 0.05)' : '#F9F9F9'};
  cursor: pointer;
`;

const ModuleTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #252B42;
  margin: 0;
`;

const ModuleIcon = styled.div`
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
`;

const ModuleContent = styled.div`
  padding: ${props => props.expanded ? '1rem' : '0'};
  max-height: ${props => props.expanded ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const LessonItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #E0E0E0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const LessonTitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #737373;
`;

const LessonDuration = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #737373;
`;

// Composant de chargement
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 100%;
`;

const LoadingText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  color: #737373;
  margin-top: 1rem;
`;

// Composant d'erreur
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 100%;
  color: #e74c3c;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  text-align: center;
  max-width: 500px;
`;

const CourseDetails = () => {
  const [expandedModule, setExpandedModule] = useState(1);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Récupérer les données du cours depuis l'API
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        // Utiliser l'ID du cours depuis les paramètres d'URL ou depuis l'état de navigation
        const id = courseId || location.state?.course?.id;
        
        if (!id) {
          throw new Error('Aucun ID de cours n\'a été fourni');
        }
        
        const courseData = await courseService.getCourseById(id);
        setCourse({
          ...courseData,
          image: courseData.imageUrl || javaImage, // Utiliser l'image du cours ou une image par défaut
          provider: courseData.professor?.name || 'Professeur',
          students: courseData.enrolledCount || '0'
        });
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des détails du cours:', err);
        setError(err.message || 'Une erreur est survenue lors du chargement du cours');
        setLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [courseId, location.state]);
  
  const toggleModule = (moduleId) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };
  
  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    navigate('/course-checkout', { state: { course } });
  };
  
  // Si le cours est en cours de chargement
  if (loading) {
    return (
      <LoadingContainer>
        <div className="spinner"></div>
        <LoadingText>Chargement du cours...</LoadingText>
      </LoadingContainer>
    );
  }
  
  // Si une erreur s'est produite
  if (error || !course) {
    return (
      <ErrorContainer>
        <ErrorIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </ErrorIcon>
        <ErrorText>{error || 'Impossible de charger les détails du cours'}</ErrorText>
      </ErrorContainer>
    );
  }
  
  // Préparer les données des modules à partir des sections du cours
  const modulesData = course.sections ? course.sections.map((section, index) => ({
    id: index + 1,
    title: `Module ${index + 1}: ${section.title}`,
    lessons: [{ id: 1, title: section.content, duration: '20 min' }]
  })) : [];
  
  // Préparer les résultats d'apprentissage (à partir de la description ou utiliser des valeurs par défaut)
  const learningOutcomes = [
    'Comprendre les concepts fondamentaux présentés dans ce cours',
    'Maîtriser les compétences pratiques enseignées',
    'Appliquer les connaissances acquises dans des projets réels',
    'Développer une expertise dans le domaine d\'étude'
  ];
  
  return (
    <CourseDetailsContainer>
      <MainContent>
        <LeftPanel>
          <CourseImage>
          <img 
    src={course.imageUrl ? `http://localhost:8080${course.imageUrl}` : 'https://via.placeholder.com/300x180?text=Pas+d%27image'} 
    alt={course.title}/>
          </CourseImage>
          
          <CourseTitle>{course.title}</CourseTitle>
          <CourseProvider>{course.provider}</CourseProvider>
          
          <CourseStats>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faClock} />
              </StatIcon>
              <StatText>{course.duration || 'Non spécifié'}</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </StatIcon>
              <StatText>{course.level || 'Tous niveaux'}</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faUser} />
              </StatIcon>
              <StatText>{course.students} étudiants</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faStar} />
              </StatIcon>
              <StatText>4.8 (256 avis)</StatText>
            </StatItem>
          </CourseStats>
          
          <CourseDescription>
            <p>{course.description}</p>
            <p>Ce cours complet vous guidera à travers les concepts fondamentaux, de la configuration de l'environnement de développement à la création d'applications fonctionnelles. Vous apprendrez les principes, la syntaxe et les meilleures pratiques de développement.</p>
          </CourseDescription>
          
          <SectionTitle>What you will learn</SectionTitle>
          <LearningOutcomes>
            {learningOutcomes.map((outcome, index) => (
              <OutcomeItem key={index}>
                <CheckIcon>
                  <FontAwesomeIcon icon={faCheck} />
                </CheckIcon>
                <OutcomeText>{outcome}</OutcomeText>
              </OutcomeItem>
            ))}
          </LearningOutcomes>
        </LeftPanel>
        
        <RightPanel>
          <PriceCard>
            <PriceValue>{course.price ? `${course.price} €` : 'Gratuit'}</PriceValue>
            <EnrollButton onClick={handleEnrollClick}>Register now</EnrollButton>
            
            <CourseIncludes>
              <SectionTitle>This course includes :</SectionTitle>
              <IncludeItem>
                <IncludeIcon>
                  <FontAwesomeIcon icon={faClock} />
                </IncludeIcon>
                <IncludeText>Lifetime access</IncludeText>
              </IncludeItem>
              <IncludeItem>
                <IncludeIcon>
                  <FontAwesomeIcon icon={faGraduationCap} />
                </IncludeIcon>
                <IncludeText>Certificate of Completion</IncludeText>
              </IncludeItem>
              <IncludeItem>
                <IncludeIcon>
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                </IncludeIcon>
                <IncludeText>15 hours of video content</IncludeText>
              </IncludeItem>
              <IncludeItem>
                <IncludeIcon>
                  <FontAwesomeIcon icon={faUser} />
                </IncludeIcon>
                <IncludeText>Instructor support</IncludeText>
              </IncludeItem>
            </CourseIncludes>
          </PriceCard>
          
          <ModulesCard>
            <SectionTitle>Course content</SectionTitle>
            <ModulesList>
              {modulesData.map(module => (
                <ModuleItem key={module.id}>
                  <ModuleHeader 
                    expanded={expandedModule === module.id}
                    onClick={() => toggleModule(module.id)}
                  >
                    <ModuleTitle>{module.title}</ModuleTitle>
                    <ModuleIcon expanded={expandedModule === module.id}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </ModuleIcon>
                  </ModuleHeader>
                  
                  <ModuleContent expanded={expandedModule === module.id}>
                    {module.lessons.map(lesson => (
                      <LessonItem key={lesson.id}>
                        <LessonTitle>{lesson.title}</LessonTitle>
                        <LessonDuration>{lesson.duration}</LessonDuration>
                      </LessonItem>
                    ))}
                  </ModuleContent>
                </ModuleItem>
              ))}
            </ModulesList>
          </ModulesCard>
        </RightPanel>
      </MainContent>
    </CourseDetailsContainer>
  );
};

export default CourseDetails;