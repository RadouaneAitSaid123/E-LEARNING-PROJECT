import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import heroImage from '../../assets/image-acceuil 1.png';
import featureIcon1 from '../../assets/icon_collab 1.png';
import featureIcon2 from '../../assets/icon_collab 2.png';
import featureIcon3 from '../../assets/icon_collab 3.png';
import exploreImage1 from '../../assets/exploreImage1.png';
import exploreImage2 from '../../assets/exploreImage2.png';
import exploreImage3 from '../../assets/exploreImage3.png';
import popularImage1 from '../../assets/popularImage1.png';
import popularImage2 from '../../assets/pupularImage2.png';
import popularImage3 from '../../assets/pupularImage3.png';
import popularImage4 from '../../assets/pupularImage4.png';
import IBMLogo from '../../assets/IBMLogo.png';
import googleLogo from '../../assets/googleLogo.png';
import oracleLogo from '../../assets/oracleLogo.png';
import metaLogo from '../../assets/metaLogo.png';
const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

// Section 1 - Hero Section
const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 3rem auto;
  padding: 0 1rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: black;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;


const HeroDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #004bb9;
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: #0056D2;
  border: 1px solid #0056D2;
  border-radius: 10px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: rgba(0, 86, 210, 0.1);
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 250px;
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

// Section 2 - Features
const FeaturesSection = styled.section`
  background-color:#F5F5F5;
  padding: 3rem 0;
   margin: 3rem auto;
  border-radius: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

// Section 3 - Certificates
const CertificatesSection = styled.section`
  padding: 4rem 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: left;
  margin-bottom: 2.5rem;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
  font-size: 1rem;
  color: #666;
  max-width: 700px;
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const CertificateCard = styled.div`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`;

const CertificateImage = styled.div`
  height: 180px;
  padding: 10px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CertificateContent = styled.div`
  padding: 1.5rem;
`;

const CertificateType = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const CertificateTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
`;

const CertificateProvider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProviderLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProviderName = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ShowAllButton = styled.button`
  background-color: #0056D2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto 0;
  
  &:hover {
    background-color: #004bb9;
  }
`;

// Section 4 - Explore Courses
const ExploreSection = styled.section`
  padding: 4rem 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
`;

const CourseCard = styled.div`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  height: 250px;
`;

const CourseImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
`;

const CourseContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background-color: white;
  z-index: 2;
  border-radius: 15px;
`;

const CourseCount = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const CourseTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowIcon = styled.span`
  color: #666;
`;

const Home = () => {
  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Learn without limits</HeroTitle>
          <HeroDescription>
            Start, switch, or advance your career with more than 10,000 courses, 
            Professional Certificates, and degrees from world-class universities and companies.
          </HeroDescription>
          <ButtonGroup>
            <PrimaryButton>Join for free</PrimaryButton>
            <SecondaryButton>Explore Courses</SecondaryButton>
          </ButtonGroup>
        </HeroContent>
        <HeroImage>
          <img src={heroImage} alt="Students learning online" />
        </HeroImage>
      </HeroSection>
      
      {/* Features Section */}
      <FeaturesSection>
        <FeaturesContainer>
          <FeatureCard>
            <FeatureIcon>
              <img src={featureIcon1} alt="Online Courses Feature" />
            </FeatureIcon>
            <FeatureTitle>Communication</FeatureTitle>
            <FeatureDescription>Forume de discussion, Chat, Annonces.</FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <img src={featureIcon2} alt="Expert Teachers Feature" />
            </FeatureIcon>
            <FeatureTitle>Collaboration</FeatureTitle>
            <FeatureDescription>Forume de discussion, Chat, Annonces.</FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <img src={featureIcon3} alt="Lifetime Access Feature" />
            </FeatureIcon>
            <FeatureTitle>Evaluation</FeatureTitle>
            <FeatureDescription>Forume de discussion, Chat, Annonces.</FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </FeaturesSection>
      
      {/* Certificates Section */}
      <CertificatesSection>
        <SectionHeader>
          <SectionTitle>Specializations and Professional Certificates</SectionTitle>
          <SectionSubtitle>Most Popular Certificates</SectionSubtitle>
          <SectionDescription>Explore our most popular programs</SectionDescription>
        </SectionHeader>
        
        <CertificatesGrid>
          <CertificateCard>
            <CertificateImage>
              <img src={exploreImage1} alt="Web Development Certificate" />
            </CertificateImage>
            <CertificateContent>
              <CertificateType>Professional Certificate</CertificateType>
              <CertificateTitle>Data science introduction</CertificateTitle>
              <CertificateProvider>
                <ProviderLogo>
                  <img src={IBMLogo} alt="IBM Logo" />
                </ProviderLogo>
                <ProviderName>IBM</ProviderName>
              </CertificateProvider>
            </CertificateContent>
          </CertificateCard>
          
          <CertificateCard>
            <CertificateImage>
              <img src={exploreImage2} alt="Data Science Certificate" />
            </CertificateImage>
            <CertificateContent>
              <CertificateType>Professional Certificate</CertificateType>
              <CertificateTitle>Data science introduction</CertificateTitle>
              <CertificateProvider>
                <ProviderLogo>
                  <img src={googleLogo} alt="Google Logo" />
                </ProviderLogo>
                <ProviderName>Google</ProviderName>
              </CertificateProvider>
            </CertificateContent>
          </CertificateCard>
          
          <CertificateCard>
            <CertificateImage>
              <img src={exploreImage3} alt="Business Certificate" />
            </CertificateImage>
            <CertificateContent>
              <CertificateType>Professional Certificate</CertificateType>
              <CertificateTitle>Data science introduction</CertificateTitle>
              <CertificateProvider>
                <ProviderLogo>
                  <img src={oracleLogo} alt="Oracle Logo" />
                </ProviderLogo>
                <ProviderName>Oracle</ProviderName>
              </CertificateProvider>
            </CertificateContent>
          </CertificateCard>
          
          <CertificateCard>
            <CertificateImage>
              <img src={exploreImage1} alt="Web Development Certificate" />
            </CertificateImage>
            <CertificateContent>
              <CertificateType>Professional Certificate</CertificateType>
              <CertificateTitle>Data science introduction</CertificateTitle>
              <CertificateProvider>
                <ProviderLogo>
                  <img src={metaLogo} alt="IBM Logo" />
                </ProviderLogo>
                <ProviderName>IBM</ProviderName>
              </CertificateProvider>
            </CertificateContent>
          </CertificateCard>
        </CertificatesGrid>
        
        <ShowAllButton>
          Show all <FontAwesomeIcon icon={faArrowRight} />
        </ShowAllButton>
      </CertificatesSection>
      
      {/* Explore Courses Section */}
      <ExploreSection>
        <SectionHeader>
          <SectionTitle>Explore Coursera</SectionTitle>
        </SectionHeader>
        
        <CoursesGrid>
          <CourseCard>
            <CourseImage>
              <img src={popularImage1} alt="Popular Course 1" />
            </CourseImage>
            <CourseContent>
              <CourseCount>50 courses</CourseCount>
              <CourseTitle>
                Computer science
                <ArrowIcon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </ArrowIcon>
              </CourseTitle>
            </CourseContent>
          </CourseCard>
          
          <CourseCard>
            <CourseImage>
              <img src={popularImage2} alt="Popular Course 2" />
            </CourseImage>
            <CourseContent>
              <CourseCount>50 courses</CourseCount>
              <CourseTitle>
                Computer science
                <ArrowIcon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </ArrowIcon>
              </CourseTitle>
            </CourseContent>
          </CourseCard>
          
          <CourseCard>
            <CourseImage>
              <img src={popularImage3} alt="Popular Course 3" />
            </CourseImage>
            <CourseContent>
              <CourseCount>50 courses</CourseCount>
              <CourseTitle>
                Computer science
                <ArrowIcon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </ArrowIcon>
              </CourseTitle>
            </CourseContent>
          </CourseCard>
          
          <CourseCard>
            <CourseImage>
              <img src={popularImage4} alt="Popular Course 4" />
            </CourseImage>
            <CourseContent>
              <CourseCount>50 courses</CourseCount>
              <CourseTitle>
                Computer science
                <ArrowIcon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </ArrowIcon>
              </CourseTitle>
            </CourseContent>
          </CourseCard>
          
          <CourseCard>
            <CourseImage>
              <img src={popularImage1} alt="Popular Course 1" />
            </CourseImage>
            <CourseContent>
              <CourseCount>50 courses</CourseCount>
              <CourseTitle>
                Computer science
                <ArrowIcon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </ArrowIcon>
              </CourseTitle>
            </CourseContent>
          </CourseCard>
          
          <CourseCard>
            <CourseImage>
              <img src={popularImage2} alt="Popular Course 2" />
            </CourseImage>
            <CourseContent>
              <CourseCount>50 courses</CourseCount>
              <CourseTitle>
                Computer science
                <ArrowIcon>
                  <FontAwesomeIcon icon={faArrowRight} />
                </ArrowIcon>
              </CourseTitle>
            </CourseContent>
          </CourseCard>
        </CoursesGrid>
      </ExploreSection>
    </HomeContainer>
  );
};

export default Home;