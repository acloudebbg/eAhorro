export const theme = {
  colors: {
    primary: '#00a8e8',
    primaryDark: '#008bc4',
    primaryLight: '#88c9e4',
    primaryLighter: '#cce7f4',
    secondary: '#2c3e50',
    secondaryDark: '#1a252f',
    secondaryLight: '#34495e',
    accent: '#27ae60',
    accentLight: '#2ecc71',
    accentDark: '#219653',
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f8f9fa',
      100: '#f1f3f5',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529'
    },
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8'
  },
  font: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    secondary: 'Open Sans, sans-serif'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    primary: '0 4px 12px rgba(0, 168, 232, 0.15)'
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  },
  container: {
    sm: '600px',
    md: '800px',
    lg: '1200px',
    xl: '1400px'
  }
}

export type ThemeType = typeof theme
