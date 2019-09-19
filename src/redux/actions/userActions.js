import { SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from './../types';
import axios from 'axios';

// Helper authorization header
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['authorization'] = FBIdToken;
}

export const loginUser =  (userData, history) =>  (dispatch) => {
    dispatch({ type: LOADING_UI });
    
    axios.post('/login', userData)
        .then(response => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
            //console.log(this.state);
        });
};

export const getUserData = () => async (dispatch) => {
    
    axios.get('/user')
        .then(response => {
            dispatch({
                type: SET_USER,
                payload: response.data
            });
        })
        .catch(err => console.log(err));
           
};

export const signupUser = (newUserData, history) => (dispatch) => {
    //dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: LOADING_UI });
    
    axios.post('/signup', newUserData)
        .then(response => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
            //console.log(this.state);
        });
};

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    history.push('/');
}