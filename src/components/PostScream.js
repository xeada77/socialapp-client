import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import theme from '../util/theme';


// Redux
import { postScream } from './../redux/actions/dataActions';
import { connect } from 'react-redux';


// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


const styles = {
    ...theme,
    submitButton: {
        position: 'relative'
    },
    progressSpiner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
};

class PostScream extends Component {

    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '' });
            this.handleClose();
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Scream!">
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton tip="close" onClick={this.handleClose}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>
                        Post a new scream
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                tipe="test"
                                label="SCREAM!!"
                                multiline
                                rows="4"
                                placeholder="Scream at your fellow apes"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={
                                    classes.textField
                                }
                                onChange={this.handleChange}
                                fullWidth
                            />
                            
                            <Button
                                    type="submit" variant="contained"
                                    color="primary"
                                    className={classes.submitButton}
                                    disabled={loading}
                                >
                                    Submit
                                        {loading && (<CircularProgress size={30} className={classes.progressSpiner} />)}
                            </Button>                            
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream));
