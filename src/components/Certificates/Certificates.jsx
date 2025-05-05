import React from 'react';
import styled from 'styled-components';
import IBMLogo from '../../assets/IBMLogo.png';
import googleLogo from '../../assets/googleLogo.png';
import oracleLogo from '../../assets/oracleLogo.png';
import metaLogo from '../../assets/metaLogo.png';
import myCertifImage from '../../assets/myCertifImage.png';

const CertificatesContainer = styled.div`
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
`;

const TabIndicator = styled.div`
  height: 5px;
  width: 100%;
  background-color: ${props => props.active ? '#0056D2' : 'transparent'};
  margin-top: 5px;
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

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 27px;
  width: 100%;
  max-width: 1159px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CertificateCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #BDBDBD;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;
const Divider = styled.hr`
  border: none;
  border-top: 2px solid #e0e0e0;
    margin-top: -18px;
    width: 80%;
    z-index: 0;
`;

const CertificateImage = styled.div`
  height: 160px;
  width: 100%;
  overflow: hidden;
  padding: 10px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CertificateContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CertificateTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #252B42;
  margin: 0;
`;

const ProviderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 0.5rem;
`;

const ProviderLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border: 0.5px solid #BDBDBD;
`;

const ProviderName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
`;

const CertificateType = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #737373;
  margin: 0.5rem 0 0 0;
`;

const ShowMoreButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #0056D2;
  border-radius: 10px;
  padding: 11px 37px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #0056D2;
  cursor: pointer;
  margin: 2rem auto;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: #0056D2;
    color: white;
  }
`;

const certificateData = [
  {
    id: 1,
    title: 'Data science introduction',
    provider: 'IBM',
    providerLogo: IBMLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
  {
    id: 2,
    title: 'Google UX Design',
    provider: 'Google',
    providerLogo: googleLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
  {
    id: 3,
    title: 'Oracle Java Foundations',
    provider: 'Oracle',
    providerLogo: oracleLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
  {
    id: 4,
    title: 'Meta Front-End Developer',
    provider: 'Meta',
    providerLogo: metaLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
  {
    id: 5,
    title: 'IBM Business Analyst',
    provider: 'IBM',
    providerLogo: IBMLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
  {
    id: 6,
    title: 'Data science introduction',
    provider: 'Google Cloud',
    providerLogo: googleLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
  {
    id: 7,
    title: 'Data science introduction',
    provider: 'University of California',
    providerLogo: IBMLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
  {
    id: 8,
    title: 'Introduction to Java ...',
    provider: 'University of Pennsylvania',
    providerLogo: IBMLogo,
    image: myCertifImage,
    type: 'Professional Certificate'
  },
];

const Certificates = () => {
  return (
    <CertificatesContainer>
      <SectionHeader>
        <HeaderTab>
          <TabText active={true}>Certificates</TabText>
          <TabIndicator active={true} />
        </HeaderTab>
        <HeaderTab>
          <TabText active={false}>My courses</TabText>
          <TabIndicator active={false} />
        </HeaderTab>
    
      </SectionHeader>
      <Divider />
      
      
      
      <SectionTitle>Cover the full collection</SectionTitle>
      
      <CertificatesGrid>
        {certificateData.map(certificate => (
          <CertificateCard key={certificate.id}>
            <CertificateImage>
              <img src={certificate.image} alt={certificate.title} />
            </CertificateImage>
            <CertificateContent>
              <CertificateTitle>{certificate.title}</CertificateTitle>
              <ProviderRow>
                <ProviderLogo src={certificate.providerLogo} alt={certificate.provider} />
                <ProviderName>{certificate.provider}</ProviderName>
              </ProviderRow>
              <CertificateType>{certificate.type}</CertificateType>
            </CertificateContent>
          </CertificateCard>
        ))}
      </CertificatesGrid>
      
      <ShowMoreButton>Show more</ShowMoreButton>
    </CertificatesContainer>
  );
};

export default Certificates;