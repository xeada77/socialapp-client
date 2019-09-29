import React, { Component} from 'react';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {

    

    render() {
        dayjs.extend(relativeTime);
        dayjs.locale('es');
        const {
            classes,
            scream: {
                body,
                createdAt,
                userImg,
                screamId,
                userHandle,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: {
                    handle
                }
            }
        } = this.props

        
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ): null;


        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    image={userImg}
                    src={userImg}
                    title="Profile image"
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        color="primary"
                        component={Link} to={`/users/${userHandle}`}>
                        {userHandle}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    {deleteButton}
                    <Typography
                        variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes </span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments </span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Scream));
