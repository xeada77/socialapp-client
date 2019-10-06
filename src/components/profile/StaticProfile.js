import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import theme from '../../util/theme';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';



// Icons
import EmailIcon from '@material-ui/icons/Email';
import CalendarToday from '@material-ui/icons/CalendarToday';



const styles = {
    ...theme,
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
    }
}
const StaticProfile = (props) => {

    

    const { profile: {imgUrl, handle, createdAt, email}, classes } = props;
    
    
    const staticProfileMarkup = (<Paper className={classes.paper}>
        <div className={classes.profile}>
            <div className="image-wrapper">
                <img className="profile-image" src={imgUrl} alt="Profile" />
            </div>
            <hr />
            <div className="profile-details">
                <MuiLink component={Link} to={`/user/${handle}`} color='primary' variant='h5'>@{handle}</MuiLink>
                <hr />
                {email &&
                    <Fragment>
                        <EmailIcon color="primary" /> <span>{email}</span>
                        <hr />
                    </Fragment>
                }
                {createdAt &&
                    <Fragment>
                        <CalendarToday color="primary" />
                        <span>{` Miembro desde ${dayjs(createdAt).format('MMMM YYYY')}`}
                        </span>
                        <hr />
                    </Fragment>
                }
            </div>
        </div>
    </Paper>);
       
    
    
    return staticProfileMarkup
    
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile)

