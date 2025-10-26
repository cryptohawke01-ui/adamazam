import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getContent } from '../services/api';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #000000 0%, #111111 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 90vh;
    padding: 1rem 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 20px;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 15px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.1;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.accent};
  line-height: 1.2;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const AuthorImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin: 2rem auto;
  display: block;
  border: 4px solid ${props => props.theme.colors.accent};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 200px;
    height: 200px;
    margin: 1.5rem auto;
  }
`;

const BookImage = styled.img`
  width: 200px;
  height: auto;
  margin: 2rem auto;
  display: block;
  box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 150px;
    margin: 1.5rem auto;
  }
`;

const ContentSection = styled.section`
  padding: 80px 0;
  background-color: ${props => props.theme.colors.background};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 60px 0;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 15px;
  }
`;

const ContentTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ContentText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    text-align: left;
  }
`;

const Home: React.FC = () => {
  const { data: content, isLoading } = useQuery('homeContent', () => getContent('home'));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>I Am</HeroTitle>
          <HeroSubtitle>Adam Muhammad Azam</HeroSubtitle>
          <HeroDescription>
            Philanthropist & Entrepreneur
          </HeroDescription>
          <AuthorImage 
            src="https://github.com/adamazam2749-cmyk/adamazam.com/blob/main/author_new_img.jpg?raw=true"
            alt="Adam Muhammad Azam"
          />
          <BookImage 
            src="https://github.com/adamazam2749-cmyk/adamazam.com/blob/main/book-mock-467x800.png?raw=true"
            alt="Surviving 9/11: My American Dream Reclaimed"
          />
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentContainer>
          <ContentTitle>About Adam</ContentTitle>
          <ContentText>
            {typeof content?.content === 'string' 
              ? content.content 
              : `Adam Muhammad Azam, the author of "Surviving 9/11: My American Dream Reclaimed," is an amazing individual whose life journey serves as evidence of the power of determination and resilience. Born with a firm spirit and a persistent drive for success, Azam's life took a surprising turn in the wake of the 9/11 terrorist attacks. Before this essential moment, he had attained significant success as a regional director at Snyder Communications (AT&T).`}
          </ContentText>
        </ContentContainer>
      </ContentSection>
    </>
  );
};

export default Home;
