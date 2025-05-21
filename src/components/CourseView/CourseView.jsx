import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronLeft, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import javaImage from '../../assets/myCoursesImage.png';
import {Link, useParams} from 'react-router-dom';
import {courseService} from '../../services/api';

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
    background-color: ${props => props.active ? 'rgba(0, 86, 210, 0.05)' : 'transparent'};
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

// Les données de modules seront chargées dynamiquement depuis l'API

const CourseView = () => {
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modulesData, setModulesData] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');

    const [activeTab, setActiveTab] = useState('overview');
    const [isModuleActive, setIsModuleActive] = useState(1);
    const [isLessonItemActive, setIsLessonItemActive] = useState(1);


    const [expandedModule, setExpandedModule] = useState(1);
    const [activeLesson, setActiveLesson] = useState(1);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);
                const courseData = await courseService.getCourseById(courseId);
                setCourse(courseData);

                // Transformer les sections en modules pour l'affichage
                if (courseData.sections && courseData.sections.length > 0) {
                    const formattedModules = courseData.sections.map((section, index) => ({
                        id: index + 1,
                        title: section.title,
                        active: index === 0,
                        content: section.content,
                        videoUrl: section.videoUrl || '',
                        lessons: [{id: 1, title: section.title, duration: '15 min'}]
                    }));

                    console.log('Modules avec URLs vidéo:', formattedModules.map(m => ({ id: m.id, title: m.title, videoUrl: m.videoUrl })));

                    setModulesData(formattedModules);

                    // Définir la première vidéo comme vidéo actuelle
                    if (formattedModules[0] && formattedModules[0].videoUrl) {
                        setCurrentVideo(formattedModules[0].videoUrl);
                    }
                }
            } catch (error) {
                console.error('Erreur lors du chargement du cours:', error);
                setError('Impossible de charger les détails du cours. Veuillez réessayer plus tard.');
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseData();
        }
    }, [courseId]);

    const toggleModule = (moduleId) => {
        console.log(`toggleModule appelé avec moduleId=${moduleId}`);
        setIsLessonItemActive(null);
        if (expandedModule === moduleId) {
            setExpandedModule(null);
            setIsModuleActive(null);
        } else {
            setExpandedModule(moduleId);
            setIsModuleActive(moduleId);

            // Mettre à jour la vidéo actuelle lorsqu'un module est sélectionné
            const selectedModule = modulesData.find(module => module.id === moduleId);
            console.log("Module sélectionné:", selectedModule);
            if (selectedModule && selectedModule.videoUrl) {
                console.log("Changement de vidéo URL:", selectedModule.videoUrl);
                console.log("Ancien currentVideo:", currentVideo);
                setCurrentVideo(selectedModule.videoUrl);
                console.log("Nouveau currentVideo (après setState):", selectedModule.videoUrl);

                // Forcer la mise à jour de la vidéo
                setTimeout(() => {
                    console.log("currentVideo après timeout:", currentVideo);
                }, 100);
            }
        }
    };

    const toggleLesson = (moduleId, lessonId) => {
        if (expandedModule == moduleId) {
            if (activeLesson === lessonId) {
                setActiveLesson(null);
                setIsLessonItemActive(null);
            } else {
                setActiveLesson(lessonId);
                setIsLessonItemActive(lessonId);
            }
        } else {
            setActiveLesson(lessonId);
            setIsLessonItemActive(lessonId);
            setExpandedModule(moduleId);
            setIsModuleActive(moduleId);
        }

        // Mettre à jour la vidéo actuelle
        const selectedModule = modulesData.find(module => module.id === moduleId);
        if (selectedModule && selectedModule.videoUrl) {
            setCurrentVideo(selectedModule.videoUrl);
        }
    };

    return (
        <CourseViewContainer>
            <HeaderBar>
                <HeaderContent>

                    <HedearContentLeft>
                        <Link to="/">
                            <ReturnHome>
                                <FontAwesomeIcon icon={faChevronLeft}/>
                                <span>Home</span>
                            </ReturnHome>
                        </Link>
                        <BreadcrumbNav>
                            <span>{course?.title || 'Chargement du cours...'}</span>
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
                            <FontAwesomeIcon icon={faEllipsisV}/>
                        </OptionsButton>
                    </HeaderActions>
                </HeaderContent>
            </HeaderBar>

            <MainContent>
                <LeftPanel>
                    <VideoContainer>
                        {currentVideo ? (
                            <video key={currentVideo} controls width="100%" height="auto">
                                <source src={currentVideo} type="video/mp4"/>
                                Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>
                        ) : (
                            <VideoPlaceholder>
                                <img src={course?.imageUrl ? `http://localhost:8080${course.imageUrl}` : javaImage}
                                     alt="Course thumbnail"/>
                            </VideoPlaceholder>
                        )}
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
                                <h2>{course?.title || 'Chargement du cours...'}</h2>
                                {loading ? (
                                    <p>Chargement du contenu du cours...</p>
                                ) : error ? (
                                    <p style={{color: 'red'}}>{error}</p>
                                ) : (
                                    <div>
                                        <p>{course?.description}</p>
                                        {isModuleActive && modulesData[isModuleActive - 1] && (
                                            <div>
                                                <h3>{modulesData[isModuleActive - 1].title}</h3>
                                                <p>{modulesData[isModuleActive - 1].content}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                        <FontAwesomeIcon icon={faChevronDown}/>
                                    </ModuleIcon>
                                </ModuleHeader>

                                <ModuleContent expanded={expandedModule === module.id}>
                                    {module.lessons.map(lesson => (
                                        <LessonItem
                                            active={isLessonItemActive == lesson.id}
                                            isActiveLesson={activeLesson === lesson.id}
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

