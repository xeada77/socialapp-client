import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { editUserDetails } from './../redux/actions/userActions';
import { connect } from 'react-redux';
import MyButton from '../util/MyButton';


// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import theme from '../util/theme';
import { Button } from '@material-ui/core';

const styles = (theme) => ({
    ...theme,
    
});

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount() {
        const credentials = this.props.credentials;
        this.mapUserDetailsToState(credentials);
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }

    onTextfieldChange = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {

        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton
                    tip="Edit details"
                    onClick={this.handleOpen}
                    placement="right"
                    btnClassName={classes.button}
                >
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="4"
                                placeholder="A short bio about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.onTextfieldChange}
                                fullWidth
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your personal/profesional website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.onTextfieldChange}
                                fullWidth
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where are you from"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.onTextfieldChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

           </Fragment> 
        )
    }
}

EditDetails.propTypes = {
    credentials: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};



const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});


export default connect(mapStateToProps, {editUserDetails})(withStyles(styles(theme))(EditDetails));
