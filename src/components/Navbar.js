import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Redux Stuff
import { connect } from 'react-redux';
import { logoutUser } from './../redux/actions/userActions';

// Material-UI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { mergeClasses } from '@material-ui/styles';

const styles = {
    grow: {
        flexGrow: 1
    }
}

class Navbar extends Component {
    
    logout = () => {
        this.props.logoutUser(this.props.history);
    };
    render() {
        const { classes } = this.props;
        return (
            <Appbar position="fixed" className="nav-container" >
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/" className="home-but">Home</Button>
                    <div className={classes.grow} />
                    {!this.props.authenticated && (
                        <Button color="inherit" component={Link} to="/login" className="user-but">Login</Button>)}
                    {!this.props.authenticated && (
                        <Button color="inherit" component={Link} to="/signup" className="user-but">SignUp</Button>)}
                    {this.props.authenticated && (
                        <Button color="inherit" onClick={this.logout} className="user-but">Logout</Button>)}
                    {this.props.authenticated &&
                        (<IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            className="user-but"
                        >
                            <AccountCircle />
                        </IconButton>)
                    }                    
                </Toolbar>
            </Appbar>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    logoutUser
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Navbar));
