import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import theme from '../../util/theme';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton'


import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';



// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& .button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    render() {

        const {
            classes, user: { loading, authenticated, credentials: { handle, email, bio, website, location, imgUrl, createdAt } } } = this.props;

        let profileMarkup = !loading ?
            (authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img className="profile-image" src={imgUrl} alt="Profile" />
                            <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                            <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} placement="right" btnClassName="button" >
                                <EditIcon color="primary"/>
                            </MyButton>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>@{handle}</MuiLink>
                            <hr />
                            {bio && <Typography variant='body2'>{bio}</Typography>}
                            <hr />
                            {location &&
                                <Fragment>
                                    <LocationOn color="primary" /> <span>{location}</span>
                                    <hr/>
                                </Fragment>
                            }
                            {email &&
                                <Fragment>
                                    <EmailIcon color="primary"/> <span>{email}</span>
                                    <hr/>
                                </Fragment>
                            }
                            {website &&
                                <Fragment>
                                <LinkIcon color="primary" /><a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                                    <hr/>
                                </Fragment>
                            }
                            {createdAt &&
                                <Fragment>
                                <CalendarToday color="primary" />
                                <span>{` Miembro desde ${dayjs(createdAt).format('MMMM YYYY')}`}
                                </span>
                                <hr/>
                                </Fragment>
                            }
                            <EditDetails/>
                        </div>
                    </div>
                </Paper>
            ) : (<Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found, please login again
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
            </Paper>)) : (<div className="loading-container"><CircularProgress className={classes.progress} size="5rem" /></div>)

        return profileMarkup;
    }
}        
export default (withStyles(styles(theme))(Profile));
