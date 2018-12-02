import 'typeface-roboto';
import 'react-table/react-table.css';
import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './components/App';
import reducers from './reducers';

const theme = createMuiTheme({
  palette: {
    primary: {
      // blue color
      main: '#4a6572'
    },
    secondary: {
      // organge
      main: '#f9aa33',
      contrastText: '#fff'
    }
  },
  typography: {
    title: {
      color: '#f9aa33 !important',
      letterSpacing: '1.6px',
      textDecoration: 'none'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        color: 'white',
        letterSpacing: '1.5px',
        fontSize: '13px',
        textTransform: 'capitalize',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)'
        }
      },
      containedPrimary: {
        background: 'linear-gradient(264deg, #fdd562, #f9aa33)',
        boxShadow: 'none'
      },
      containedSecondary: {
        backgroundColor: '#4a6572',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#4a6572'
        }
      }
    },
    MuiSelect: {
      select: {
        '&:focus': {
          background: 'none'
        }
      }
    }
  }
});

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#root')
);
