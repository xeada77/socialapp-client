import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';
 

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}

class DeleteScream extends Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleDeleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.handleClose();
    }

    render() {

        const { classes} = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete Scream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClick={this.deleteScream}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this scream?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleDeleteScream} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}


export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream));
