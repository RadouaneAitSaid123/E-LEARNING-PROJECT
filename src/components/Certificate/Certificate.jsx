import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShare} from '@fortawesome/free-solid-svg-icons';
import pennLogo from '../../assets/penselvLogo.png';
import userAvatar from '../../assets/VectorImage.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CertificateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Montserrat', sans-serif;
`;


const CertificateContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CertificateTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #252B42;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CertificateLayout = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const CompletionInfoCard = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CertificateCard = styled.div`
  flex: 1.5;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 1px solid #e0e0e0;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: #252B42;
    border-style: solid;
  }
  
  &::before {
    top: 10px;
    left: 10px;
    border-width: 1px 0 0 1px;
  }
  
  &::after {
    top: 10px;
    right: 10px;
    border-width: 1px 1px 0 0;
  }
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: #252B42;
    border-style: solid;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #252B42;
  margin: 0 0 0.25rem 0;
`;

const CompletionText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #737373;
  margin: 0;
`;

const CompletionDetails = styled.div`
  margin-top: 1rem;
`;

const DetailItem = styled.div`
  margin-bottom: 0.75rem;
`;

const DetailLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #737373;
  display: block;
`;

const DetailValue = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #252B42;
  display: block;
`;

const LearningSection = styled.div`
  margin-top: 2rem;
`;

const LearningTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #252B42;
  margin-bottom: 1rem;
`;

const LearningList = styled.ul`
  padding-left: 1.5rem;
  margin: 0;
`;

const LearningItem = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #737373;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const CertificateHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const CertificateBadge = styled.div`
  background-color: #f5f7fa;
  padding: 1rem;
  border-radius: 0 0 50% 50%;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #252B42;
  line-height: 1.2;
  position: relative;
  width: 150px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2rem;
  top: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background-color: #f0f7ff;
    border-radius: 50%;
    opacity: 0.5;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background-color: #252B42;
    border-radius: 50%;
    opacity: 0.2;
  }
`;

const UniversityLogo = styled.div`
  img {
    height: 60px;
    object-fit: contain;
  }
`;

const CertificateBody = styled.div`
  text-align: center;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
  margin: 2rem 0;
`;

const CertificateText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #737373;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  
  &.date {
    align-self: flex-start;
    margin-left: 1rem;
    margin-bottom: 2rem;
    font-style: italic;
  }
`;

const StudentName = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #252B42;
  margin: 0.5rem 0;
`;

const CourseName = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #0056D2;
  margin: 0.5rem 0 1rem 0;
`;

const CertificateFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  padding-top: 1rem;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: #252B42;
    border-style: solid;
    bottom: -30px;
  }
  
  &::before {
    left: 10px;
    border-width: 0 0 1px 1px;
  }
  
  &::after {
    right: 10px;
    border-width: 0 1px 1px 0;
  }
`;

const SignatureBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
`;

const SignatureLine = styled.div`
  width: 150px;
  height: 1px;
  background-color: #252B42;
  margin-bottom: 0.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' width='100' height='30'%3E%3Cpath d='M10 15 Q 30 5, 50 15 Q 70 25, 90 15' stroke='%23252B42' fill='none' stroke-width='1'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    top: -15px;
  }
`;

const SignatureName = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #252B42;
  margin: 0;
  font-style: italic;
`;

const SignatureTitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #737373;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.primary ? '#0056D2' : 'white'};
  color: ${props => props.primary ? 'white' : '#0056D2'};
  border: 1px solid #0056D2;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${props => props.primary ? '#004bb9' : '#f0f7ff'};
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Certificate = () => {
  
  // Données du certificat basées sur l'image de référence
  const [certificateData] = useState({
    date: 'May 30, 2024',
    studentName: 'PETER JOHN',
    courseName: 'Introduction to Java and Object-Oriented Programming',
    completionDate: 'April 15, 2023',
    hours: '19 hours (approximately)',
    grade: '90%',
    learningPoints: [
      'Identify core aspects of object-oriented programming and features of the Java language.',
      'Use Eclipse for writing and running Java code.',
      'Develop programs that use Java collections and apply core object-oriented programming concepts using classes, polymorphism ...'
    ]
  });
  
  // Référence pour le certificat
  const certificateRef = useRef(null);
  const[isLoading, setIsLoading] = useState(false);
  
  const handleDownload = () => {
    setIsLoading(true);
    const loadingToast = toast ? toast.loading('Préparation du certificat...') : null;
  
    if (certificateRef.current) {
      html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
  
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const scaledWidth = imgWidth * ratio ;
        const scaledHeight = imgHeight * ratio;
  
        const x = (pageWidth - scaledWidth) / 2;
        const y = (pageHeight - scaledHeight) / 2;
  
        pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
        pdf.save(`${certificateData.studentName}_certificate.pdf`);
  
        if (loadingToast) toast.dismiss(loadingToast);
        toast.success('Certificat téléchargé avec succès !');
      }).catch(err => {
        if (loadingToast) toast.dismiss(loadingToast);
        toast.error("Une erreur s'est produite lors de la génération du certificat.");
        console.error(err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };
  
  
  
  const handleShare = () => {
    // Logique pour partager le certificat
    console.log('Partage du certificat');
    // Dans une implémentation réelle, on utiliserait l'API Web Share ou des liens vers les réseaux sociaux
  };
  
  
  return (
    <CertificateContainer>
      
      <CertificateContent>
        <CertificateTitle>Introduction to Java and Object-Oriented Programming</CertificateTitle>
        
        <CertificateLayout>
          <CompletionInfoCard>
            <UserProfile>
              <UserAvatar>
                <img src={userAvatar} alt="User Avatar" />
              </UserAvatar>
              <UserInfo>
                <UserName>Completed by PETER JOHN</UserName>
                <CompletionText>{certificateData.completionDate}</CompletionText>
              </UserInfo>
            </UserProfile>
            
            <CompletionDetails>
              <DetailItem>
                <DetailLabel>Hours</DetailLabel>
                <DetailValue>{certificateData.hours}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Grade Achieved</DetailLabel>
                <DetailValue>{certificateData.grade}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Peter John's account is verified. Coursera certifies their successful completion of</DetailLabel>
                <DetailValue>{certificateData.courseName}</DetailValue>
              </DetailItem>
            </CompletionDetails>
            
            <LearningSection>
              <LearningTitle>What you learned</LearningTitle>
              <LearningList>
                {certificateData.learningPoints.map((point, index) => (
                  <LearningItem key={index}>{point}</LearningItem>
                ))}
              </LearningList>
            </LearningSection>
          </CompletionInfoCard>
          
          <CertificateCard ref={certificateRef}>
            <CertificateHeader>
              <UniversityLogo>
                <img src={pennLogo} alt="University of Pennsylvania Logo" />
              </UniversityLogo>
            </CertificateHeader>
            <CertificateBadge>
              COURSE<br />CERTIFICATE
            </CertificateBadge>
            
            <CertificateBody>
              <CertificateText className="date">{certificateData.date}</CertificateText>
              <StudentName>{certificateData.studentName}</StudentName>
              <CertificateText>has successfully completed</CertificateText>
              <CourseName>{certificateData.courseName}</CourseName>
              <CertificateText>an online non-credit course authorized by University of Pennsylvania</CertificateText>
            </CertificateBody>
            
            <CertificateFooter>
              <SignatureBlock>
                <SignatureLine />
                <SignatureName>Brandon Krakowsky</SignatureName>
                <SignatureTitle>Lecturer</SignatureTitle>
                <SignatureTitle>School of Engineering and Applied Science</SignatureTitle>
              </SignatureBlock>
            </CertificateFooter>
          </CertificateCard>
        </CertificateLayout>
        
        <ActionButtons>
          <ActionButton primary onClick={handleDownload} disabled={isLoading}>
            {isLoading ? 'Saving . . .': (
              <>
               <FontAwesomeIcon icon={faDownload} />
               Télécharger le certificat
               </>
            )}
           
          </ActionButton>
          <ActionButton onClick={handleShare}>
            <FontAwesomeIcon icon={faShare} />
            Partager le certificat
          </ActionButton>
        </ActionButtons>
      </CertificateContent>
      <ToastContainer position="bottom-right"/>
    </CertificateContainer>
  );
};

export default Certificate;