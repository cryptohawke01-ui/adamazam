import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/GlobalStyle';
import SimpleHeader from './components/SimpleHeader';
import SimpleHome from './pages/SimpleHome';
import AboutBook from './pages/AboutBook';
import AboutAuthor from './pages/AboutAuthor';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <SimpleHeader />
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/about-the-book" element={<AboutBook />} />
          <Route path="/about-the-author" element={<AboutAuthor />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;