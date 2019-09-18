import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppIcon from './../images/icon.png';
import axios from 'axios';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}



class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {},
            handle: '',
            confirmPassword: '',
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        
        try {
            const response = await axios.post('/signup', newUserData);
            console.log(response.data);
            localStorage.setItem('FBIdToken', `Bearer ${response.data.token}`);
            this.setState({ loading: false });
            this.props.history.push('/');
        } catch (err) {
            console.log(err.response.data);
            this.setState({
                errors: err.response.data,
                loading: false
            });
            //console.log(this.state);
        }
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="Icon" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email? true: false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                            autoFocus={true} />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            helperText={errors.password}
                            error={errors.password ? true: false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true: false}
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="handle"
                            name="handle"
                            label="Handle"
                            helperText={errors.handle}
                            error={errors.handle ? true: false}
                            className={classes.textField}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth />
                        
                        {errors.general && (
                            <Typography
                                variant="body2"
                                className={classes.customError}
                            >
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>)
                            }
                        </Button>                        
                    </form>
                    <small>Already have an account? login <Link to="/login">here</Link></small>
                </Grid>
                <Grid item sm />
           </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup);