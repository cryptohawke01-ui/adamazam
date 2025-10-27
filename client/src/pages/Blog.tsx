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


const ContentSection = styled.section`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.8;
`;

const ContentTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const ComingSoonTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const ComingSoonText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Blog: React.FC = () => {
  const { data: content, isLoading } = useQuery('blogContent', () => getContent('blog'));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Container>
        <PageTitle>Blog</PageTitle>
        
        <ComingSoon>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          <ComingSoonText>
            We're working on bringing you insightful articles and updates from Adam Azam. 
            Check back soon for thought-provoking content about resilience, entrepreneurship, 
            and the American dream.
          </ComingSoonText>
        </ComingSoon>

        <ContentSection>
          <ContentTitle>Stay Updated</ContentTitle>
          <div>
            {typeof content?.content === 'string' 
              ? content.content 
              : `Our blog will feature personal insights, professional experiences, and reflections on topics ranging from leadership and resilience to community service and the pursuit of success. Adam Azam's unique perspective, shaped by his experiences before and after 9/11, offers valuable lessons for anyone facing challenges in their personal or professional life.

We'll be sharing stories of perseverance, tips for overcoming adversity, and thoughts on what it means to truly reclaim and achieve the American dream. Each post will be crafted to inspire and motivate our readers to pursue their own goals with determination and hope.`}
          </div>
        </ContentSection>
      </Container>
    </PageContainer>
  );
};

export default Blog;
