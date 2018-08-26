import "typeface-roboto";
// import "materialize-css/dist/css/materialize.min.css";
import "react-table/react-table.css";
import "./styles/app.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import App from "./components/App";
import reducers from "./reducers";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4a6572"
    },
    secondary: {
      main: "#0044ff"
    }
  },
  typography: {
    title: {
      color: "#f9aa33 !important",
      letterSpacing: "1.6px",
      textDecoration: "none"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        color: "white",
        letterSpacing: "1.5px",
        fontSize: "13px",
        textTransform: "capitalize"
      },
      containedPrimary: {
        background: "linear-gradient(264deg, #fdd562, #f9aa33)",
        boxShadow: "none"
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
  document.querySelector("#root")
);
