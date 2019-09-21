import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { uploadImage } from './../redux/actions/userActions';

import Scream from './../components/Scream';
import Profile from './../components/Profile';


import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try {
            const screams = await axios.get('/screams');
            this.setState({ screams: screams.data });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { user, uploadImage } = this.props;

        let recentScreamsMarkup = this.state.screams ?
            (this.state.screams.map(scream => { return <Scream scream={scream} key={scream.screamId} /> })) :
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
});

const mapActionsToProps = {
    uploadImage
}

export default connect(mapStateToProps, mapActionsToProps)(home)
