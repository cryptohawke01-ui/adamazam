import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getAdminContent, getAdminMenu } from '../../services/api';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const StatTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
`;

const ContentSection = styled.section`
  background-color: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const ContentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContentItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DashboardOverview: React.FC = () => {
  const { data: content } = useQuery('adminContent', getAdminContent);
  const { data: menu } = useQuery('adminMenu', getAdminMenu);

  const contentCount = content?.content?.length || 0;
  const menuCount = menu?.menuItems?.length || 0;

  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard Overview</DashboardTitle>
      
      <StatsGrid>
        <StatCard>
          <StatTitle>Content Sections</StatTitle>
          <StatValue>{contentCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Menu Items</StatTitle>
          <StatValue>{menuCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Active Sections</StatTitle>
          <StatValue>{content?.content?.filter((item: any) => item.is_active).length || 0}</StatValue>
        </StatCard>
      </StatsGrid>

      <ContentSection>
        <SectionTitle>Recent Content</SectionTitle>
        <ContentList>
          {content?.content?.slice(0, 5).map((item: any) => (
            <ContentItem key={item.id}>
              {item.title} - {item.section}
            </ContentItem>
          ))}
        </ContentList>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Menu Items</SectionTitle>
        <ContentList>
          {menu?.menuItems?.map((item: any) => (
            <ContentItem key={item.id}>
              {item.label} - {item.url}
            </ContentItem>
          ))}
        </ContentList>
      </ContentSection>
    </DashboardContainer>
  );
};

export default DashboardOverview;
