import React, { Component } from "react";
import { getUserData } from '../redux/actions/dataActions';
import axios from "axios";
import { connect } from "react-redux";
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import PropTypes from 'prop-types';

// MUI
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";

class user extends Component {

    state = {
        profile: null,
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({ profile: res.data.user });
                console.log(this.state.profile)
            })
            .catch(err => console.log(err));
    }

    render() {
        const { screams, loading } = this.props.data;
        

        const screamsMarkup = loading ? (<div className="loading-container"><CircularProgress size="5rem" /></div>) : screams === null ?
            (
                <p>No screams for this user</p>
            ) : (
                screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
            )

        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {this.state.profile === null ? null : (<Typography align="center" variant="h4" color="primary">Screams of <span style={{textTransform: 'capitalize'}}>{this.state.profile.handle}</span></Typography>)}
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (<div className="loading-container"><CircularProgress size="5rem" /></div>) : (<StaticProfile profile={this.state.profile}/>)}
                
                </Grid>
            </Grid>
        );
    }

}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
} 


const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);