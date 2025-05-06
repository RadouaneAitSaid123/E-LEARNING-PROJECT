import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faClock, faUser, faChalkboardTeacher, faGraduationCap, faStar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import javaImage from '../../assets/myCoursesImage.png';

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

const CourseDetails = () => {
  const [expandedModule, setExpandedModule] = useState(1);
  //const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Récupérer les données du cours depuis l'état de navigation ou utiliser des données par défaut
  const course = location.state?.course || {
    id: 1,
    title: 'Introduction à la Programmation Java',
    provider: 'Université de Pennsylvanie',
    image: javaImage,
    description: 'Apprenez les bases de la programmation orientée objet avec Java dans ce cours complet.',
    duration: '8 semaines',
    level: 'Débutant',
    students: '15K',
    price: '49,99 €'
  };
  
  const toggleModule = (moduleId) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };
  
  const handleEnrollClick = () => {
    navigate('/course-checkout', { state: { course } });
  };
  
  // Données simulées pour les modules
  const modulesData = [
    {
      id: 1,
      title: 'Module 1: Introduction to Java',
      lessons: [
        { id: 1, title: 'What is Java?', duration: '15 min' },
        { id: 2, title: 'Installing the development environment', duration: '20 min' },
        { id: 3, title: 'Your first Java program', duration: '25 min' }
      ]
    },
    {
      id: 2,
      title: 'Module 2: Variables and Data Types',
      lessons: [
        { id: 1, title: 'Primitive Types in Java', duration: '20 min' },
        { id: 2, title: 'Declaration and initialization of variables', duration: '15 min' },
        { id: 3, title: 'Type conversion', duration: '20 min' }
      ]
    },
    {
      id: 3,
      title: 'Module 3: Control Structures',
      lessons: [
        { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
        { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
        { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
      ]
    }
  ];
  
  // Données simulées pour les résultats d'apprentissage
  const learningOutcomes = [
    'Understand the fundamental concepts of object-oriented programming',
'Master the basic syntax and structures of Java',
'Create simple yet functional Java applications',
'Understand how to debug and test Java programs',
'Apply good programming practices in Java'
  ];
  
  return (
    <CourseDetailsContainer>
      <MainContent>
        <LeftPanel>
          <CourseImage>
            <img src={course.image} alt={course.title} />
          </CourseImage>
          
          <CourseTitle>{course.title}</CourseTitle>
          <CourseProvider>{course.provider}</CourseProvider>
          
          <CourseStats>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faClock} />
              </StatIcon>
              <StatText>{course.duration}</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </StatIcon>
              <StatText>{course.level}</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faUser} />
              </StatIcon>
              <StatText>{course.students} students</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <FontAwesomeIcon icon={faStar} />
              </StatIcon>
              <StatText>4.8 (256 notice)</StatText>
            </StatItem>
          </CourseStats>
          
          <CourseDescription>
            <p>{course.description}</p>
            <p>This comprehensive course will guide you through the fundamentals of Java, from setting up the development environment to creating functional applications. You'll learn the principles of object-oriented programming, Java syntax, and development best practices.</p>
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
            <PriceValue>{course.price}</PriceValue>
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