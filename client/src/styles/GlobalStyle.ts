import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#0066cc',
    text: '#ffffff',
    textSecondary: '#cccccc',
    background: '#000000',
    surface: '#111111',
    border: '#333333',
    error: '#ff4444',
    success: '#44ff44',
    warning: '#ffaa00'
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    heading: 'Georgia, "Times New Roman", serif'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem'
  }
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 14px;
    }
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    color: inherit;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  input, textarea {
    font-family: inherit;
    color: inherit;
    -webkit-appearance: none;
    border-radius: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 0 15px;
    }
  }

  .section {
    padding: 60px 0;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 40px 0;
    }
  }

  .text-center {
    text-align: center;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }

  .mt-4 {
    margin-top: 1rem;
  }

  .mt-8 {
    margin-top: 2rem;
  }

  /* Mobile-specific improvements */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    h1 {
      font-size: 2rem !important;
      line-height: 1.2;
    }
    
    h2 {
      font-size: 1.5rem !important;
      line-height: 1.3;
    }
    
    h3 {
      font-size: 1.25rem !important;
      line-height: 1.4;
    }
    
    p {
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* Improve touch targets */
    button, a, input, textarea {
      min-height: 44px;
    }
    
    /* Better scrolling on mobile */
    * {
      -webkit-overflow-scrolling: touch;
    }
    
    /* Prevent zoom on input focus */
    input, textarea, select {
      font-size: 16px;
    }
  }
`;
