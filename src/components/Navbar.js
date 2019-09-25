import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../util/MyButton'

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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import NotificationIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';

const styles = {
    grow: {
        flexGrow: 1
    },
    userHandle: {
        marginLeft: '1rem',
        textTransform: 'capitalize'
    }
}

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            anchorEl: null,
            menuIsOpen: false
        }
    }
    
    logout = () => {
        this.props.logoutUser(this.props.history);
    };

    handleOpenMenu = (event) => {
        //console.log(event.currentTarget);
        this.setState({
            anchorEl: event.currentTarget,
            menuIsOpen: true
        });
    }

    handleCloseMenu = () => {
        this.setState({
            anchorEl: null,
            menuIsOpen: false
        });
    }
    render() {
        const { user: {authenticated,credentials: { handle}}, classes, loadingUser } = this.props;
        return (
            <Appbar position="fixed" className="nav-container" >
                <Toolbar className="nav-container">
                    <MyButton tip="Home">
                        <Link to="/"><HomeIcon  /></Link>
                    </MyButton>
                    {authenticated &&
                        (
                        <Fragment>
                            <MyButton tip="Post a Scream!">
                                <AddIcon  />
                            </MyButton>
                            <MyButton tip="Notifications">
                                <NotificationIcon  />
                            </MyButton>
                        </Fragment>
                        )}
                    <div className={classes.grow} />
                    {!loadingUser && (
                    <Fragment>
                    <div className="nav-action-container">
                        {!authenticated && (
                        <div>
                            <Button color="inherit" component={Link} to="/login" className="user-but">Login</Button>
                            <Button color="inherit" component={Link} to="/signup" className="user-but">SignUp</Button>
                        </div>
                    )}
                    {authenticated &&
                        (<div>
                            <Button color="inherit" onClick={this.logout} className="user-but">Logout</Button>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    className="user-but"
                                    onClick={this.handleOpenMenu}
                                >
                                    <AccountCircle /> 
                                        
                                </IconButton>
                            
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={this.state.menuIsOpen}
                                    onClose={this.handleCloseMenu}
                                >
                                    <MenuItem onClick={this.handleCloseMenu}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleCloseMenu}>My account</MenuItem>
                                    <MenuItem onClick={this.handleCloseMenu}>Logout</MenuItem>
                                </Menu>
                            </div>
                                )}
                        </div>
                        <div>
                        <Typography className={classes.userHandle}>{handle}</Typography> 
                        </div>  
                    </Fragment>
                    )}    
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
