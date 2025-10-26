import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getContent } from '../services/api';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 80px 0;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const AuthorSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const AuthorImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${props => props.theme.colors.accent};
  box-shadow: 0 20px 40px rgba(0, 102, 204, 0.3);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 300px;
    height: 300px;
  }
`;

const AuthorInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary};
`;

const AuthorName = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const AuthorTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const AuthorDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ContentSection = styled.section`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.8;
`;

const ContentTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const AchievementItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const AchievementTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const AchievementDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
`;

const AboutAuthor: React.FC = () => {
  const { data: content, isLoading } = useQuery('authorContent', () => getContent('about-author'));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Container>
        <PageTitle>About The Author</PageTitle>
        
        <AuthorSection>
          <AuthorImage 
            src="https://github.com/adamazam2749-cmyk/adamazam.com/blob/main/author_new_img.jpg?raw=true"
            alt="Adam Muhammad Azam"
          />
          <AuthorInfo>
            <AuthorName>Adam Muhammad Azam</AuthorName>
            <AuthorTitle>Philanthropist & Entrepreneur</AuthorTitle>
            <AuthorDescription>
              Adam Muhammad Azam is an inspiring individual whose life journey serves as evidence 
              of the power of determination and resilience. His story is one of triumph over 
              adversity and the relentless pursuit of the American dream.
            </AuthorDescription>
          </AuthorInfo>
        </AuthorSection>

        <ContentSection>
          <ContentTitle>Biography</ContentTitle>
          <div>
            {typeof content?.content === 'string' 
              ? content.content 
              : `Adam Muhammad Azam, the author of "Surviving 9/11: My American Dream Reclaimed," is an amazing individual whose life journey serves as evidence of the power of determination and resilience. Born with a firm spirit and a persistent drive for success, Azam's life took a surprising turn in the wake of the 9/11 terrorist attacks. Before this essential moment, he had attained significant success as a regional director at Snyder Communications (AT&T).

His professional journey demonstrates remarkable adaptability and leadership skills. Through his work in telecommunications and his subsequent ventures, Azam has shown an unwavering commitment to excellence and community service. His experiences have shaped him into a thoughtful leader who understands the importance of resilience in the face of adversity.

Beyond his professional achievements, Azam is known for his philanthropic efforts and his dedication to helping others overcome challenges. His story serves as an inspiration to many who face similar obstacles in their pursuit of success and fulfillment.`}
          </div>

          <ContentTitle>Professional Achievements</ContentTitle>
          <AchievementsList>
            <AchievementItem>
              <AchievementTitle>Regional Director at Snyder Communications (AT&T)</AchievementTitle>
              <AchievementDescription>
                Led regional operations and managed significant business portfolios, demonstrating exceptional leadership and strategic thinking.
              </AchievementDescription>
            </AchievementItem>
            <AchievementItem>
              <AchievementTitle>Author of "Surviving 9/11: My American Dream Reclaimed"</AchievementTitle>
              <AchievementDescription>
                Published a compelling memoir that shares his personal journey and inspires others facing similar challenges.
              </AchievementDescription>
            </AchievementItem>
            <AchievementItem>
              <AchievementTitle>Philanthropic Work</AchievementTitle>
              <AchievementDescription>
                Committed to community service and helping others overcome obstacles through various charitable initiatives.
              </AchievementDescription>
            </AchievementItem>
          </AchievementsList>
        </ContentSection>
      </Container>
    </PageContainer>
  );
};

export default AboutAuthor;
