import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Variables CSS - Paleta de iAhorro */
  :root {
    /* Colores principales */
    --color-primary: #00a8e8;
    --color-primary-dark: #008bc4;
    --color-primary-light: #88c9e4;
    --color-primary-lighter: #cce7f4;
    --color-secondary: #2c3e50;
    --color-secondary-dark: #1a252f;
    --color-secondary-light: #34495e;
    --color-accent: #27ae60;
    --color-accent-light: #2ecc71;
    --color-warning: #f39c12;
    --color-error: #e74c3c;
    --color-success: #27ae60;
    
    /* Colores neutros */
    --color-white: #ffffff;
    --color-black: #000000;
    --color-gray-50: #f8f9fa;
    --color-gray-100: #f1f3f5;
    --color-gray-200: #e9ecef;
    --color-gray-300: #dee2e6;
    --color-gray-400: #ced4da;
    --color-gray-500: #adb5bd;
    --color-gray-600: #6c757d;
    --color-gray-700: #495057;
    --color-gray-800: #343a40;
    --color-gray-900: #212529;
    
    /* Tipografa */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-secondary: 'Open Sans', sans-serif;
    
    /* Espaciados */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;
    
    /* Sombras */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
    --shadow-primary: 0 4px 12px rgba(0, 168, 232, 0.15);
    
    /* Transiciones */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.25s ease;
    --transition-slow: 0.35s ease;
    
    /* Tamaos de contenedores */
    --container-sm: 600px;
    --container-md: 800px;
    --container-lg: 1200px;
    --container-xl: 1400px;
  }

  /* Base styles */
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-primary);
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-gray-800);
    background-color: var(--color-white);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    color: var(--color-secondary);
  }

  h1 { 
    font-size: 2.5rem; 
    font-weight: 700;
  }
  h2 { 
    font-size: 2rem; 
    font-weight: 700;
  }
  h3 { 
    font-size: 1.75rem; 
    font-weight: 600;
  }
  h4 { 
    font-size: 1.5rem; 
    font-weight: 600;
  }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }
  
  /* Estilos para secciones comunes */
  section {
    padding: var(--spacing-2xl) 0;
  }
  
  .container {
    width: 100%;
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  p {
    margin-bottom: var(--spacing-md);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary-dark);
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Form elements */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, select, textarea {
    font-family: inherit;
    font-size: 1rem;
  }

  /* Utility classes */
  .container {
    width: 100%;
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  .text-center { text-align: center; }
  .text-primary { color: var(--color-primary); }
  .text-secondary { color: var(--color-secondary); }
  .text-white { color: var(--color-white); }
  .text-gray-600 { color: var(--color-gray-600); }
  .bg-primary { background-color: var(--color-primary); }
  .bg-secondary { background-color: var(--color-secondary); }
  .bg-white { background-color: var(--color-white); }
  .bg-gray-50 { background-color: var(--color-gray-50); }
  
  /* Estilos para botones */
  .btn {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 1rem;
    transition: all var(--transition-fast);
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-family: inherit;
  }
  
  .btn-primary {
    background: var(--color-primary);
    color: var(--color-white);
    
    &:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-primary);
    }
  }
  
  .btn-secondary {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    
    &:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }
  
  .btn-white {
    background: var(--color-white);
    color: var(--color-secondary);
    border: 2px solid var(--color-white);
    
    &:hover {
      background: transparent;
      color: var(--color-white);
    }
  }
  
  /* Estilos para tarjetas */
  .card {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-gray-100);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-gray-400);
    border-radius: var(--radius-full);
    
    &:hover {
      background: var(--color-gray-500);
    }
  }

  /* Select styling */
  select {
    font-family: inherit;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--color-white);
    cursor: pointer;
    transition: border-color var(--transition-fast);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(0, 168, 232, 0.1);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    
    .container {
      padding: 0 var(--spacing-md);
    }
    
    /* Mobile adjustments for client area */
    .client-mobile {
      display: none;
    }
    
    @media (max-width: 992px) {
      .client-mobile {
        display: block;
      }
    }
  }
`
