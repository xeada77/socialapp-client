import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import theme from '../../util/theme';


// Redux
import { postScream, clearErrors } from '../../redux/actions/dataActions';
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
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpiner: {
        position: 'absolute'
    }
};

const PostScream = props => {

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({ body: '' });

    useEffect(() => {
        console.log('ui errors changed', props.UI.errors);
        if (props.UI.errors) setErrors(props.UI.errors);
        if (!props.UI.errors && !props.UI.loading) {
            console.log('clear');
            setErrors({});
            setOpen(false);
            setInputs({ body: '' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.UI.errors])


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        props.clearErrors();
        setOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.postScream({ body: inputs.body });
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setInputs({[name] : value});
    }

    const { classes, UI: { loading } } = props;
        
    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip="Post a Scream!">
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton tip="close" onClick={handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>
                        Post a new scream
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
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
                                onChange={handleChange}
                                fullWidth
                                variant="filled"
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

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));
