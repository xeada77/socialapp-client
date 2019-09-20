import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';
import CalendarToday from '@material-ui/icons/CalendarToday';


const styles = {

};

class Profile extends Component {

    render() {

        const { classes, user: { loading, authenticated, credentials: { handle, email, bio, website, location, imgUrl, createdAt } } } = this.props;

        let profileMarkup = !loading ?
            (authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div>
                            <img src={imgUrl} alt="Profile"/>
                        </div>
                        <hr />
                        <div>
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
                                <span>
                                    {' '}Unido desde {dayjs(createdAt).format('MMM YYYY')}
                                </span>
                                </Fragment>
                            }
                        </div>
                    </div>
                </Paper>
            ) : (<p>No profile...</p>)) : (<p>Loading...</p>)

        return profileMarkup;
    }
}        
export default (withStyles(styles)(Profile));
