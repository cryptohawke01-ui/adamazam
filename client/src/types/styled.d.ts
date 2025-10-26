import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      text: string;
      textSecondary: string;
      background: string;
      surface: string;
      border: string;
      error: string;
      success: string;
      warning: string;
    };
    fonts: {
      primary: string;
      heading: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
