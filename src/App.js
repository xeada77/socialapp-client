import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import themeDefault from './util/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';


// Redux
import { connect } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import { SET_AUTHENTICATED } from './redux/types';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import axios from 'axios';



const theme = createMuiTheme(themeDefault);

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['authorization'] = token;
    store.dispatch(getUserData());
  }
}


class App extends Component {
  render() {
    const { loadingUser } = this.props;
    return (      
      <MuiThemeProvider theme={theme}>        
        <Router>
          <Route path="/" render={(props) => <Navbar {...props}  loadingUser={loadingUser}/> } />
            <div className="container"> 
              <Switch>
                  <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={this.props.authenticated} />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={this.props.authenticated} />
                </Switch>
            </div>
          </Router>
          
      </MuiThemeProvider>
      
    );
    }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loadingUser: state.user.loading
});

export default connect(mapStateToProps)(App)

