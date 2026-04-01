import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7B2D8B',      // Purple (SETU)
      light: '#9C4DB5',
      dark: '#5A1F66',
    },
    secondary: {
      main: '#E05A1C',      // Orange (Paavan)
      light: '#F07A40',
      dark: '#B8410F',
    },
    warning: {
      main: '#F4B942',      // Gold/Sun
    },
    background: {
      default: '#FFF8F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1A3E',
      secondary: '#5A4068',
    },
  },
  typography: {
    fontFamily: '"Cormorant Garamond", "Georgia", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
    },
    body1: {
      fontFamily: '"Lato", sans-serif',
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: '"Lato", sans-serif',
    },
    button: {
      fontFamily: '"Lato", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 32px',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          letterSpacing: '0.12em',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0e652d, #1f5b87)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9C4DB5, #7B2D8B)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(123,45,139,0.4)',
          },
          transition: 'all 0.3s ease',
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #E05A1C, #B8410F)',
          '&:hover': {
            background: 'linear-gradient(135deg, #F07A40, #E05A1C)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(224,90,28,0.4)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(44,26,62,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 40px rgba(44,26,62,0.15)',
          },
        },
      },
    },
  },
});

export default theme;
