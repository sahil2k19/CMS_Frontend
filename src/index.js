import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000', // black
      contrastText: '#FFFFFF', // white text on primary
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#FFFFFF', // white background on hover
        },
      },
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
  <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </ThemeProvider>
    </AuthProvider>
);


