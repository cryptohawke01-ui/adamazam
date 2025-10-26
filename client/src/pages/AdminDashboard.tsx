import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import ContentManagement from '../components/admin/ContentManagement';
import MenuManagement from '../components/admin/MenuManagement';
import DashboardOverview from '../components/admin/DashboardOverview';
import BlogManagement from '../components/admin/BlogManagement';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <DashboardContainer>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MainContent>
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/blog" element={<BlogManagement />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
