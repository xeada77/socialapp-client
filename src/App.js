import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import themeDefault from './util/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Redux
import { connect } from 'react-redux';


// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme(themeDefault);


class App extends Component {
  render() {
    const { authenticated, loadingUser } = this.props;
    return (      
      <MuiThemeProvider theme={theme}>        
        <Router>
          <Route path="/" render={(props) => <Navbar {...props} authenticated={authenticated} loadingUser={loadingUser}/> } />
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

