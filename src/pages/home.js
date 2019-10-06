import React, { useEffect } from 'react';
import Scream from './../components/scream/Scream';
import Profile from './../components/profile/Profile';

// Redux
import { connect } from 'react-redux';
import { uploadImage } from './../redux/actions/userActions';
import { getScreams} from '../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = (props) => {

    useEffect(() => {
        console.log('DidMount');
        props.getScreams();
        return () => {
            console.log('unmount')
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    
        const { user, uploadImage, data:{screams, loading} } = props;
        
        let recentScreamsMarkup = loading ? (<div className="loading-container"><CircularProgress size="5rem" /></div>) : (
            screams.map(scream => {
                return <Scream scream={scream} key={scream.screamId} />
            })
        );

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


const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
});

const mapActionsToProps = {
    uploadImage,
    getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(Home)
