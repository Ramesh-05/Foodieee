import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(14, 100%, 53%)', // Food orange
      light: 'hsl(14, 100%, 60%)',
      dark: 'hsl(14, 100%, 45%)',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'hsl(32, 95%, 44%)', // Golden accent
      light: 'hsl(32, 95%, 55%)',
      dark: 'hsl(32, 95%, 35%)',
      contrastText: '#ffffff',
    },
    success: {
      main: 'hsl(142, 72%, 29%)',
      light: 'hsl(142, 72%, 40%)',
      dark: 'hsl(142, 72%, 20%)',
    },
    warning: {
      main: 'hsl(45, 93%, 47%)',
      light: 'hsl(45, 93%, 57%)',
      dark: 'hsl(45, 93%, 37%)',
    },
    error: {
      main: 'hsl(0, 72%, 51%)',
      light: 'hsl(0, 72%, 61%)',
      dark: 'hsl(0, 72%, 41%)',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: 'hsl(0, 0%, 15%)',
      secondary: 'hsl(0, 0%, 45%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 12,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, hsl(14, 100%, 53%), hsl(14, 100%, 45%))',
          '&:hover': {
            background: 'linear-gradient(135deg, hsl(14, 100%, 45%), hsl(14, 100%, 40%))',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          borderRadius: 16,
          '&:hover': {
            boxShadow: '0 8px 32px rgba(14, 100%, 53%, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, hsl(14, 100%, 53%), hsl(14, 100%, 45%))',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});