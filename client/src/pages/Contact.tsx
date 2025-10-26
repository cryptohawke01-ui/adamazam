import React, { useState } from 'react';
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled.form`
  background-color: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: 0.9rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.85rem;
  }
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
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.6rem;
    font-size: 0.9rem;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  
  &:hover {
    background-color: #0052a3;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary};
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 2rem;
`;

const ContactLabel = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ContactValue = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { data: content, isLoading } = useQuery('contactContent', () => getContent('contact'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Container>
        <PageTitle>Contact Us</PageTitle>
        
        <ContactGrid>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
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
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
          
          <ContactInfo>
            <ContactTitle>Get In Touch</ContactTitle>
            <ContactItem>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>info@adamazam.com</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue>+1 (555) 123-4567</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Address</ContactLabel>
              <ContactValue>
                123 Main Street<br />
                New York, NY 10001<br />
                United States
              </ContactValue>
            </ContactItem>
          </ContactInfo>
        </ContactGrid>

        <ContentSection>
          <ContentTitle>We'd Love to Hear From You</ContentTitle>
          <div>
            {typeof content?.content === 'string' 
              ? content.content 
              : `We're always interested in hearing from readers, potential collaborators, and anyone who has been inspired by Adam Azam's story. Whether you have questions about his book, want to discuss speaking opportunities, or simply want to share your own story of resilience, we'd love to connect with you.

Your message is important to us, and we'll do our best to respond to all inquiries within 24-48 hours. Thank you for taking the time to reach out and for being part of our community.`}
          </div>
        </ContentSection>
      </Container>
    </PageContainer>
  );
};

export default Contact;
