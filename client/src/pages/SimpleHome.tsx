import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #000000 0%, #111111 100%);
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 20px;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: #0066cc;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #cccccc;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AuthorImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin: 2rem auto;
  display: block;
  border: 4px solid #0066cc;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const BookImage = styled.img`
  width: 200px;
  height: auto;
  margin: 2rem auto;
  display: block;
  box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);
  
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const ContentSection = styled.section`
  padding: 80px 0;
  background-color: #000000;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContentTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #ffffff;
`;

const ContentText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #cccccc;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SimpleHome: React.FC = () => {
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
            Adam Muhammad Azam, the author of "Surviving 9/11: My American Dream Reclaimed," is an amazing individual whose life journey serves as evidence of the power of determination and resilience. Born with a firm spirit and a persistent drive for success, Azam's life took a surprising turn in the wake of the 9/11 terrorist attacks. Before this essential moment, he had attained significant success as a regional director at Snyder Communications (AT&T).
          </ContentText>
        </ContentContainer>
      </ContentSection>
    </>
  );
};

export default SimpleHome;
