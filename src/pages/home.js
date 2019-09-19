import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import { connect } from 'react-redux';

import Scream from './../components/Scream';

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
        let recentScreamsMarkup = this.state.screams ?
            (this.state.screams.map(scream => { return <Scream scream={scream} key={scream.screamId} /> })) :
            <p>Loading....</p>

        return (
            <Grid container spacing={4}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.props.user.authenticated ? <p>Profile..</p> : <p>No Profile..</p> }
                    
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps)(home)
