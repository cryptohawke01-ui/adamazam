import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { loginAdmin } from '../services/api';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000 0%, #111111 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: 3rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.25rem;
  font-size: 0.875rem;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0052a3;
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
`;

const InfoMessage = styled.div`
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.4;
`;

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useMutation(loginAdmin, {
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Admin Login</LoginTitle>
        
        <InfoMessage>
          <strong>Default Credentials:</strong><br/>
          Email: admin@adamazam.com<br/>
          Password: admin123
        </InfoMessage>
        
        {loginMutation.error && (
          <ErrorMessage>
            {loginMutation.error?.response?.data?.error || 'Login failed'}
          </ErrorMessage>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordContainer>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ paddingRight: '40px' }}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </PasswordToggle>
            </PasswordContainer>
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;
