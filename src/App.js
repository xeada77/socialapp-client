import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import themeDefault from './util/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme(themeDefault);

let authenticated;
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
          <Navbar authenticated={authenticated} />
            <div className="container"> 
              <Switch>
                  <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={authenticated} />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={authenticated} />
                </Switch>
            </div>
          </Router>
          </Provider>
      </MuiThemeProvider>
      
    );
    }
}

export default App

