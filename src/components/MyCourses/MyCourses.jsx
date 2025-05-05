import React from 'react';
import styled from 'styled-components';
import javaImage from '../../assets/myCoursesImage.png';
import { useNavigate } from 'react-router-dom';

const MyCoursesContainer = styled.div`
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
  clickable: true;
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

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 100%;
  max-width: 1159px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
`;

const CourseCard = styled.div`
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  border: 1px solid #BDBDBD;
  box-shadow: 0px 0px 4px 2px rgba(189, 189, 189, 0.5);
  position: relative;
  height: 175px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const CourseImage = styled.div`
  width: 300px;
  height: 100%;
  overflow: hidden;
  padding: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

const CourseContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const ProviderName = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #737373;
  margin: 0 0 0.5rem 0;
`;

const CourseTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: ${props => props.long ? '16px' : '20px'};
  color: #252B42;
  margin: 0 0 1rem 0;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #D9D9D9;
  border-radius: 100px;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #21B84A;
  border-radius: 100px;
`;

const ProgressText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #737373;
  margin: 0;
`;

const ProgressButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  align-items: flex-end;
  `;

const ActionButton = styled.button`

  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #004bb9;
    color: white;
  }
`;

const coursesData = [
  {
    id: 1,
    title: 'Introduction to Java and Object Programming Language',
    provider: 'University of Pennsylvania',
    image: javaImage,
    progress: 100,
    completed: true
  },
  {
    id: 2,
    title: 'Meta Front-End Developer',
    provider: 'Meta',
    image: javaImage,
    progress: 50,
    completed: false
  },
  {
    id: 3,
    title: 'Big data',
    provider: 'IBM',
    image: javaImage,
    progress: 83.33,
    completed: false
  },
  {
    id: 4,
    title: 'English',
    provider: 'University of California',
    image: javaImage,
    progress: 33.33,
    completed: false
  },
  {
    id: 5,
    title: 'Introduction to Html and Css',
    provider: 'IBM',
    image: javaImage,
    progress: 50,
    completed: false
  }
];

const MyCourses = () => {
  const navigate = useNavigate();
  const navToAvailabelCourses = () => {
    navigate('/available-courses');
  };
  return (
    <MyCoursesContainer>
      <SectionHeader>
       
       <HeaderTab>
         <TabText onClick={()=>navToAvailabelCourses()} active={false}>Available courses</TabText>
         <TabIndicator active={false} />
       </HeaderTab>
      <HeaderTab> 
         <TabText active={true}>My courses</TabText>
         <TabIndicator active={true} />
      </HeaderTab>
       
     </SectionHeader>
      
      <Divider />
      
      <SectionTitle>My learning</SectionTitle>
      
      <CoursesContainer>
        {coursesData.map(course => (
          <CourseCard key={course.id}>
            <CourseImage>
              <img src={course.image} alt={course.title} />
            </CourseImage>
            <CourseContent>
              <ProviderName>{course.provider}</ProviderName>
              <CourseTitle long={course.title.length > 30}>{course.title}</CourseTitle>
              <ProgressContainer>
                <ProgressBar progress={course.progress} />
              </ProgressContainer>
            </CourseContent>
            <ProgressButton>
                <ProgressText>{course.progress}%</ProgressText>
                <ActionButton>
                {course.completed ? 'Completed' : 'Continue'}
                </ActionButton>
            </ProgressButton>
          </CourseCard>
        ))}
      </CoursesContainer>
    </MyCoursesContainer>
  );
};

export default MyCourses;