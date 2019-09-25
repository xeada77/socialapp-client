import React, { Component} from 'react';
import MyButton from '../util/MyButton';
import DeleteScream from '../components/DeleteScream'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import LikeIcon from '@material-ui/icons/Favorite';
import UnlikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
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

    likedScream = () => {
        if (this.props.user.likes && (this.props.user.likes.findIndex(like => like.screamId === this.props.scream.screamId)) !== -1 ) {
            console.log(`likedScream ${this.props.scream.screamId}`);
            return true;
        } else {
            console.log(`not likedScream ${this.props.scream.screamId}`);
            return false;
        }
    }

    handleLikeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    }

    handleUnlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    }

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
        console.log(handle, userHandle);
        const likeButton = !authenticated ? (
            <MyButton tip="Login for Like">
                <Link to="/login"> <UnlikeIcon color="primary" /></Link>
            </MyButton>
        ) : (this.likedScream() ? (
            <MyButton tip="Unlike" onClick={this.handleUnlikeScream}>
                <LikeIcon color="primary" />
            </MyButton>
        ) :
        (
            <MyButton tip="Like" onClick={this.handleLikeScream}>
                <UnlikeIcon color="primary" />
            </MyButton>));
        
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
                    {likeButton}
                    <span>{likeCount} Likes </span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments </span>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
