import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import logoImage from '../../assets/faviconLogo.png';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #fff;
  padding-top: 2rem;
`;

const FooterSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const BrandSection = styled.div`
  flex: 1;
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #0056D2;
    margin: 0;
  }
  
  img {
    width: 40px;
    height: 40px;
  }
`;

const SocialSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg {
    color: #0056D2;
    font-size: 1.2rem;
  }
  
  &:hover {
    background-color: rgba(0, 86, 210, 0.1);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0;
`;

const LinksSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
`;

const LinkColumn = styled.div`
  flex: 1;
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.8rem;
`;

const FooterLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: #0056D2;
    text-decoration: underline;
  }
`;

const SubscribeSection = styled.div`
  flex: 1.5;
`;

const SubscribeForm = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  color: #666;
  font-size: 0.9rem;
  outline: none;
  background-color: #E6E6E6;
  
  &::placeholder {
    color: #666;
  }
`;

const SubscribeButton = styled.button`
  background-color: #0056D2;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 5px 5px 0;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #004bb9;
  }
`;

const FormText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 0;
`;

const BottomSection = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 0;
`;

const CopyrightText = styled.p`
  color: #666;
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <TopSection>
          <BrandSection>
            <BrandLogo>
              <img src={logoImage} alt="E-Learning Logo" />
              <h2>E-LEARNING</h2>
            </BrandLogo>
          </BrandSection>
          <SocialSection>
            <SocialIcons>
              <SocialIcon>
                <FontAwesomeIcon icon={faFacebookF} />
              </SocialIcon>
              <SocialIcon>
                <FontAwesomeIcon icon={faInstagram} />
              </SocialIcon>
              <SocialIcon>
                <FontAwesomeIcon icon={faTwitter} />
              </SocialIcon>
            </SocialIcons>
          </SocialSection>
        </TopSection>
        
        <Divider />
        
        <LinksSection>
          <LinkColumn>
            <ColumnTitle>Company Info</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink href="#">About Us</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Carrier</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">We are hiring</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Blog</FooterLink></LinkItem>
            </LinksList>
          </LinkColumn>
          
          <LinkColumn>
            <ColumnTitle>Legal</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink href="#">About Us</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Carrier</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">We are hiring</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Blog</FooterLink></LinkItem>
            </LinksList>
          </LinkColumn>
          
          <LinkColumn>
            <ColumnTitle>Technical Skills</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink href="#">Cyber Security</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Coding</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">DevOps</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Web Development</FooterLink></LinkItem>
            </LinksList>
          </LinkColumn>
          
          <LinkColumn>
            <ColumnTitle>Analytical Skills</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink href="#">Big Data</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Artificial Intelligence</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Business Analysis</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">API</FooterLink></LinkItem>
            </LinksList>
          </LinkColumn>
          
          <SubscribeSection>
            <ColumnTitle>Get In Touch</ColumnTitle>
            <SubscribeForm>
              <EmailInput type="email" placeholder="Your Email" />
              <SubscribeButton>Subscribe</SubscribeButton>
            </SubscribeForm>
            <FormText>Join our community for free</FormText>
          </SubscribeSection>
        </LinksSection>
      </FooterSection>
      
      <BottomSection>
        <FooterSection>
          <CopyrightText>Made By E-learning team All Right Reserved</CopyrightText>
        </FooterSection>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;