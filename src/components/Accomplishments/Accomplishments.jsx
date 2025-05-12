import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCertificate, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import javaImage from '../../assets/myCoursesImage.png';

const AccomplishmentsContainer = styled.div`
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 100%;
  max-width: 1159px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Tab = styled.div`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? '#0056D2' : 'white'};
  color: ${props => props.active ? 'white' : '#737373'};
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${props => props.active ? '#0056D2' : '#f5f5f5'};
  }
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

const CompletionDate = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #737373;
  margin: 0;
`;

const ActionButtons = styled.div`
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

const CertificateCard = styled.div`
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

const CertificateIcon = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #0056D2;
  font-size: 4rem;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 15px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: #BDBDBD;
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #252B42;
  margin-bottom: 0.5rem;
`;

const EmptyStateText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #737373;
  margin-bottom: 1.5rem;
`;

const EmptyStateButton = styled(Link)`
  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #004bb9;
    color: white;
  }
`;

// Sample data - in a real app, this would come from an API
const completedCoursesData = [
  {
    id: 1,
    title: 'Introduction to Java and Object Programming Language',
    provider: 'University of Pennsylvania',
    image: javaImage,
    completionDate: 'Completed on May 15, 2023'
  },
  {
    id: 2,
    title: 'Meta Front-End Developer',
    provider: 'Meta',
    image: javaImage,
    completionDate: 'Completed on June 22, 2023'
  },
  {
    id: 3,
    title: 'Google UX Design Professional Certificate',
    provider: 'Google',
    image: javaImage,
    completionDate: 'Completed on August 10, 2023'
  }
];

const certificatesData = [
  {
    id: 1,
    title: 'Introduction to Java and Object Programming Language',
    provider: 'University of Pennsylvania',
    issueDate: 'Issued on May 20, 2023',
    courseId: 1
  },
  {
    id: 2,
    title: 'Meta Front-End Developer',
    provider: 'Meta',
    issueDate: 'Issued on June 25, 2023',
    courseId: 2
  }
];

const Accomplishments = () => {
  const [activeTab, setActiveTab] = useState('courses');
  
  const renderCompletedCourses = () => {
    if (completedCoursesData.length === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon>
            <FontAwesomeIcon icon={faGraduationCap} />
          </EmptyStateIcon>
          <EmptyStateTitle>No Completed Courses Yet</EmptyStateTitle>
          <EmptyStateText>You haven't completed any courses yet. Browse our catalog to find courses that interest you.</EmptyStateText>
          <EmptyStateButton to="/available-courses">Browse Courses</EmptyStateButton>
        </EmptyState>
      );
    }
    
    return completedCoursesData.map(course => (
      <CourseCard key={course.id}>
        <CourseImage>
          <img src={course.image} alt={course.title} />
        </CourseImage>
        <CourseContent>
          <div>
            <ProviderName>{course.provider}</ProviderName>
            <CourseTitle long={course.title.length > 50}>{course.title}</CourseTitle>
            <CompletionDate>{course.completionDate}</CompletionDate>
          </div>
        </CourseContent>
        <ActionButtons>
          <ActionButton as={Link} to={`/course-view/${course.id}`}>
            Review Course
          </ActionButton>
        </ActionButtons>
      </CourseCard>
    ));
  };
  
  const renderCertificates = () => {
    if (certificatesData.length === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon>
            <FontAwesomeIcon icon={faCertificate} />
          </EmptyStateIcon>
          <EmptyStateTitle>No Certificates Yet</EmptyStateTitle>
          <EmptyStateText>You haven't earned any certificates yet. Complete courses to earn certificates.</EmptyStateText>
          <EmptyStateButton to="/my-courses">Go to My Courses</EmptyStateButton>
        </EmptyState>
      );
    }
    
    return certificatesData.map(certificate => (
      <CertificateCard key={certificate.id}>
        <CertificateIcon>
          <FontAwesomeIcon icon={faCertificate} />
        </CertificateIcon>
        <CourseContent>
          <div>
            <ProviderName>{certificate.provider}</ProviderName>
            <CourseTitle long={certificate.title.length > 50}>{certificate.title}</CourseTitle>
            <CompletionDate>{certificate.issueDate}</CompletionDate>
          </div>
        </CourseContent>
        <ActionButtons>
          <ActionButton as={Link} to={`/certificate/${certificate.courseId}`}>
            View Certificate
          </ActionButton>
        </ActionButtons>
      </CertificateCard>
    ));
  };
  
  return (
    <AccomplishmentsContainer>
      <SectionHeader>
        <HeaderTab>
          <TabText active={true}>My Accomplishments</TabText>
          <TabIndicator active={true} />
        </HeaderTab>
      </SectionHeader>
      <Divider />
      
      <SectionTitle>My Accomplishments</SectionTitle>
      
      <ContentContainer>
        <TabsContainer>
          <Tab 
            active={activeTab === 'courses'} 
            onClick={() => setActiveTab('courses')}
          >
            <FontAwesomeIcon icon={faGraduationCap} /> Completed Courses
          </Tab>
          <Tab 
            active={activeTab === 'certificates'} 
            onClick={() => setActiveTab('certificates')}
          >
            <FontAwesomeIcon icon={faCertificate} /> Certificates
          </Tab>
        </TabsContainer>
        
        {activeTab === 'courses' ? renderCompletedCourses() : renderCertificates()}
      </ContentContainer>
    </AccomplishmentsContainer>
  );
};

export default Accomplishments;