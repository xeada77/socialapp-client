import React, {Component} from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

// Icons
import LikeIcon from '@material-ui/icons/Favorite';
import UnlikeIcon from '@material-ui/icons/FavoriteBorderOutlined';


class LikeButton extends Component {

    likedScream = () => {
        if (this.props.user.likes && (this.props.user.likes.findIndex(like => like.screamId === this.props.screamId)) !== -1 ) {
            return true;
        } else {
            return false;
        }
    }

    handleLikeScream = () => {
        this.props.likeScream(this.props.screamId);
    }

    handleUnlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }

    render() {

        const likeButton = !this.props.user.authenticated ? (
            <Link to="/login">
                <MyButton tip="Login for Like">
                    <UnlikeIcon color="primary" />
                </MyButton>
            </Link>
        ) : (this.likedScream() ? (
            <MyButton tip="Unlike" onClick={this.handleUnlikeScream}>
                <LikeIcon color="primary" />
            </MyButton>
        ) : (
                <MyButton tip="Like" onClick={this.handleLikeScream}>
                    <UnlikeIcon color="primary" />
                </MyButton>
            )
            );

        return likeButton;
    }
}
    

LikeButton.propTypes = {
    screamId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);