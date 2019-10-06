import React, { useState, useEffect } from "react";
import { getUserData } from '../redux/actions/dataActions';
import axios from "axios";
import { connect } from "react-redux";
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import PropTypes from 'prop-types';

// MUI
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

const User = (props) => {

    const [profile, setProfile] = useState(null)
    
    useEffect(() => {
        const handle = props.match.params.handle;
        props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                setProfile(res.data.user);
                console.log(profile);
            })
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    const { screams, loading } = props.data;

    const screamsMarkup = loading ? (<div className="loading-container"><CircularProgress size="5rem" /></div>) : screams === null ?
            (
                <p>No screams for this user</p>
            ) : (
                screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
            )

    return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {profile === null ? (<div className="loading-container"><CircularProgress size="5rem" /></div>) : (<StaticProfile profile={profile}/>)}
                
                </Grid>
            </Grid>
    )
}


User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}  


const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);