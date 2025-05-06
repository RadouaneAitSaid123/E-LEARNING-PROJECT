import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faChevronDown, faPause, faVolumeUp, faExpand,faChevronLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import javaImage from '../../assets/myCoursesImage.png';
import { Link } from 'react-router-dom';

const CourseViewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #0056D2;
  padding: 1rem 0;
  color: white;
  height: 4rem;
`;

const HeaderContent = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BreadcrumbNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ReturnHome = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;

  ::after {
    content: '';
    margin-left: 1rem;
    border-left: 1px solid white;
  }
  `

  const HedearContentLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  `

const ProgressDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
`;

const ShareButton = styled.button`
  background: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border: 1.5px solid white;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  
  &:focus {
    outline: none;
  }
`;

const OptionsButton = styled.button`
  background: none;
  color: white;
  cursor: pointer;
  border: 1.5px solid white;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  padding: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const VideoContainer = styled.div`
  width: 100%;
  background-color: #000;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16 / 9;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  background-color: #252B42;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
  }
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const VideoTimer = styled.div`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  margin: 0 1rem;
  position: relative;
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.value}%;
  background-color: #0056D2;
  border-radius: 5px;
`;

const VolumeButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const FullscreenButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E0E0E0;
  margin-top: 2rem;
`;

const Tab = styled.div`
  padding: 1rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: ${props => props.active ? '600' : '500'};
  color: ${props => props.active ? '#0056D2' : '#737373'};
  border-bottom: 3px solid ${props => props.active ? '#0056D2' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #0056D2;
  }
`;

const TabContent = styled.div`
  padding: 2rem 0;
`;

const CourseDescription = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #252B42;
  line-height: 1.6;
`;

const RightPanel = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;
`;

const SidebarTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #252B42;
  margin: 0 0 1.5rem 0;
`;

const ModulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModuleItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
  background-color: ${props => props.active ? 'rgba(0, 86, 210, 0.1)' : '#F9F9F9'};
  border-left: 3px solid ${props => props.active ? '#0056D2' : 'transparent'};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 86, 210, 0.05);
  }
`;

/*const ModuleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;*/

const ModuleTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #252B42;
  margin: 0;
`;

/*const ModuleDuration = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
`;*/

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
const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.expanded ? 'rgba(0, 86, 210, 0.05)' : '#F9F9F9'};
  cursor: pointer;
`;


const LessonItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #E0E0E0;
  background-color: ${props => props.active? 'rgba(0, 86, 210, 0.05)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
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

// Sample data for modules
/*const moduleData = [
  {
    id: 1,
    title: 'Section 1: Introduction - Module 1',
    duration: '40min',
    active: true,
    lessons: [
      { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
      { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
      { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
    ]
  },
  {
    id: 2,
    title: 'Section 1: Introduction - Module 1',
    duration: '40min',
    active: false,
    lessons: [
      { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
      { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
      { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
    ]
  },
  {
    id: 3,
    title: 'Section 1: Introduction - Module 1',
    duration: '40min',
    active: false,
    lessons: [
      { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
      { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
      { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
    ]
  },
  {
    id: 4,
    title: 'Section 1: Introduction - Module 1',
    duration: '40min',
    active: false,
    lessons: [
      { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
      { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
      { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
    ]
  },
  {
    id: 5,
    title: 'Section 1: Introduction - Module 1',
    duration: '40min',
    active: false,
    lessons: [
      { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
      { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
      { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
    ]
  }
];*/

const modulesData = [
  {
    id: 1,
    title: 'Module 1: Introduction to Java',
    active: true,
    lessons: [
      { id: 1, title: 'What is Java?', duration: '15 min' },
      { id: 2, title: 'Installing the development environment', duration: '20 min' },
      { id: 3, title: 'Your first Java program', duration: '25 min' }
    ]
  },
  {
    id: 2,
    title: 'Module 2: Variables and Data Types',
    active: false,
    lessons: [
      { id: 1, title: 'Primitive Types in Java', duration: '20 min' },
      { id: 2, title: 'Declaration and initialization of variables', duration: '15 min' },
      { id: 3, title: 'Type conversion', duration: '20 min' }
    ]
  },
  {
    id: 3,
    title: 'Module 3: Control Structures',
    active: false,
    lessons: [
      { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
      { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
      { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
    ]
  },

  {
    id: 4,
    title: 'Module 4: Control Structures',
    active: false,
    lessons: [
      { id: 1, title: 'Conditional statements (if, else, switch)', duration: '25 min' },
      { id: 2, title: 'Loops (for, while, do-while)', duration: '30 min' },
      { id: 3, title: 'Jump instructions (break, continue)', duration: '15 min' }
    ]
  },

];

const CourseView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModuleActive, setIsModuleActive] = useState(1);
  const [isLessonItemActive, setIsLessonItemActive] = useState(1);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const [expandedModule, setExpandedModule] = useState(1);
  const [activeLesson, setActiveLesson] = useState(1);

  const toggleModule = (moduleId) => {
    setIsLessonItemActive(null);
    if (expandedModule === moduleId) {
      setExpandedModule(null);
      setIsModuleActive(null);
    } else {
      setExpandedModule(moduleId);
      setIsModuleActive(moduleId);
    }
  };

  const toggleLesson = (moduleId, lessonId) => {
    if(expandedModule == moduleId){
      if (activeLesson === lessonId) {
        setActiveLesson(null);
        setIsLessonItemActive(null);
      } else {
        setActiveLesson(lessonId);
        setIsLessonItemActive(lessonId);
      }
    }else{
      setActiveLesson(lessonId);
      setIsLessonItemActive(lessonId);
      setExpandedModule(moduleId);
      setIsModuleActive(moduleId);
    }
  };
  
  return (
    <CourseViewContainer>
      <HeaderBar>
        <HeaderContent>
          
          <HedearContentLeft>
            <Link to="/">
              <ReturnHome> 
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>Home</span>
              </ReturnHome>
            </Link>
            <BreadcrumbNav>
                <span>DevOps – Introduction to Docker & Kubernetes</span>
            </BreadcrumbNav>
          </HedearContentLeft>
          
          <HeaderActions>
            <ProgressDropdown>
              <span>Your progress</span>
            </ProgressDropdown>
            
            <ShareButton>
              <span>Share</span>
            </ShareButton>
            
            <OptionsButton>
              <FontAwesomeIcon icon={faEllipsisV} />
            </OptionsButton>
          </HeaderActions>
        </HeaderContent>
      </HeaderBar>
      
      <MainContent>
        <LeftPanel>
          <VideoContainer>
            <VideoPlaceholder>
              <img src={javaImage} alt="Course thumbnail" />
            </VideoPlaceholder>
            
            <VideoControls>
              <ControlsLeft>
                <PlayButton onClick={togglePlay}>
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </PlayButton>
                
                <VideoTimer>12:34 / 45:00</VideoTimer>
              </ControlsLeft>
              
              <ProgressBar>
                <Progress value={25} />
              </ProgressBar>
              
              <ControlsRight>
                <VolumeButton>
                  <FontAwesomeIcon icon={faVolumeUp} />
                </VolumeButton>
                
                <FullscreenButton>
                  <FontAwesomeIcon icon={faExpand} />
                </FullscreenButton>
              </ControlsRight>
            </VideoControls>
          </VideoContainer>
          
          <TabsContainer>
            <Tab active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
              Overview
            </Tab>
            <Tab active={activeTab === 'qa'} onClick={() => setActiveTab('qa')}>
              Q&A
            </Tab>
            <Tab active={activeTab === 'notes'} onClick={() => setActiveTab('notes')}>
              Notes
            </Tab>
            <Tab active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')}>
              Announcements
            </Tab>
            <Tab active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
              Reviews
            </Tab>
          </TabsContainer>
          
          <TabContent>
            {activeTab === 'overview' && (
              <CourseDescription>
                <h2>DevOps – Introduction to Docker & Kubernetes</h2>
                <p>
                  This course provides a comprehensive introduction to Docker and Kubernetes, two of the most important technologies in modern DevOps practices. You'll learn how to containerize applications, manage them efficiently, and orchestrate deployments at scale.
                </p>
                <p>
                  By the end of this course, you'll be able to build, deploy, and manage containerized applications using industry-standard tools and best practices.
                </p>
              </CourseDescription>
            )}
            {activeTab === 'qa' && <div>Q&A content goes here</div>}
            {activeTab === 'notes' && <div>Notes content goes here</div>}
            {activeTab === 'announcements' && <div>Announcements content goes here</div>}
            {activeTab === 'reviews' && <div>Reviews content goes here</div>}
          </TabContent>
        </LeftPanel>
        
        <RightPanel>
          <SidebarTitle>Course content</SidebarTitle>
          
          <ModulesList>
              {modulesData.map(module => (
                <ModuleItem active={isModuleActive == module.id} key={module.id}>
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
                      <LessonItem 
                        active={isLessonItemActive == lesson.id} 
                        activeLesson={activeLesson === lesson.id}
                        onClick={() => toggleLesson(module.id, lesson.id)}
                        key={lesson.id}
                      >
                        <LessonTitle>{lesson.title}</LessonTitle>
                        <LessonDuration>{lesson.duration}</LessonDuration>
                      </LessonItem>
                    ))}
                  </ModuleContent>
                </ModuleItem>
              ))}
            </ModulesList>
        </RightPanel>
      </MainContent>
    </CourseViewContainer>
  );
};

export default CourseView;