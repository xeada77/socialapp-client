import React, { Component } from 'react';


import { connect } from 'react-redux';
import { uploadImage } from './../redux/actions/userActions';
import { getScreams, likeScream } from '../redux/actions/dataActions';

import Scream from './../components/Scream';
import Profile from './../components/Profile';


import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screams: [],
            authenticated: false
        };
    }

    async componentDidMount() {
        this.props.getScreams();
        this.setState({ screams: this.props.screams, authenticated: this.props.user.authenticated});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        if (nextProps.user.authenticated) {
            return {
                ...prevState,
                authenticated: nextProps.user.authenticated
            }
        }
        return null;
    }

    handleLike = (screamId) => {
        const { user:{authenticated}, likeScream } = this.props;
        if(authenticated) {
            //console.log(screamId);
            likeScream(screamId); 
        } else {
            console.log('Not authenticated');
        }
        

    }

    render() {
        //getScreams();
        const { user, uploadImage, screams } = this.props;
        //const {screams} = this.state;

        let recentScreamsMarkup = screams ?
            (screams.map(scream => { return <Scream scream={scream} key={scream.screamId} handleLike={this.handleLike} authenticated={this.state.authenticated}/> })) :
            <div className="loading-container"><CircularProgress size="5rem" /></div>

        return (
            <Grid container spacing={4}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile user={user} uploadImage={uploadImage}/>                    
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    screams: state.data.screams
});

const mapActionsToProps = {
    uploadImage,
    getScreams,
    likeScream
}

export default connect(mapStateToProps, mapActionsToProps)(home)
