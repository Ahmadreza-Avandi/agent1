import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazirmatn, sans-serif',
  },
  palette: {
    mode,
    primary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: mode === 'light' ? '#F0FDF4' : '#0F172A',
      paper: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
    },
    text: {
      primary: mode === 'light' ? '#1F2937' : '#F3F4F6',
      secondary: mode === 'light' ? '#4B5563' : '#D1D5DB',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        dir: 'rtl',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light' 
              ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
              : '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
});