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

const BookSection = styled.section`
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

const BookImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  box-shadow: 0 20px 40px rgba(0, 102, 204, 0.3);
  border-radius: 8px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 300px;
  }
`;

const BookInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary};
`;

const BookTitle = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const BookSubtitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const BookDescription = styled.p`
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

const AboutBook: React.FC = () => {
  const { data: content, isLoading } = useQuery('bookContent', () => getContent('about-book'));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Container>
        <PageTitle>About The Book</PageTitle>
        
        <BookSection>
          <BookImage 
            src="https://github.com/adamazam2749-cmyk/adamazam.com/blob/main/book-mock-467x800.png?raw=true"
            alt="Surviving 9/11: My American Dream Reclaimed"
          />
          <BookInfo>
            <BookTitle>Surviving 9/11: My American Dream Reclaimed</BookTitle>
            <BookSubtitle>by Adam Muhammad Azam</BookSubtitle>
            <BookDescription>
              A powerful memoir that chronicles one man's journey through the aftermath of 9/11, 
              showcasing resilience, determination, and the reclaiming of the American dream.
            </BookDescription>
          </BookInfo>
        </BookSection>

        <ContentSection>
          <ContentTitle>Book Overview</ContentTitle>
          <div>
            {typeof content?.content === 'string' 
              ? content.content 
              : `This compelling memoir tells the story of Adam Muhammad Azam's remarkable journey through one of America's darkest periods. The book explores themes of resilience, identity, and the pursuit of the American dream in the face of unprecedented challenges.

Through personal anecdotes and reflections, Azam shares how the events of September 11, 2001, transformed his life and career. From his successful position as a regional director at Snyder Communications (AT&T) to navigating the complex social and political landscape that followed, this book offers an intimate look at one man's determination to reclaim his place in American society.

The narrative is both deeply personal and universally relevant, touching on themes of perseverance, community, and the enduring strength of the human spirit. Azam's story serves as a testament to the power of resilience and the importance of maintaining hope even in the most challenging circumstances.`}
          </div>
        </ContentSection>
      </Container>
    </PageContainer>
  );
};

export default AboutBook;
