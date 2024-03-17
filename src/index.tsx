/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './app/store';

import pathRegular from './fonts/BasisGrotesquePro-Regular.woff2';
import pathMedium from './fonts/BasisGrotesquePro-Medium.woff2';
import pathBold from './fonts/BasisGrotesquePro-Bold.woff2';

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#316fea',
    },
    text: {
      primary: '#1A1919',
    },
  },
  typography: {
    fontFamily: 'BasisGrotesquePro, Arial',
    h1: {
      color: '#1A1919',
      fontSize: '30px',
      fontWeight: 700,
      lineHeight: '38px',
    },
    body1: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '20px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'BasisGrotesquePro';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url(${pathRegular}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'BasisGrotesquePro';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Raleway'), local('Raleway-Regular'), url(${pathMedium}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'BasisGrotesquePro';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Raleway'), local('Raleway-Regular'), url(${pathBold}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          height: '31px',
          fontSize: '15px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'BasisGrotesquePro, Arial',
          fontWeight: 500,
          lineHeight: '20px',
          fontSize: '14px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '48px',
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: 16,
          fontWeight: 500,
          borderRadius: '8px',
          lineHeight: '21px',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);

