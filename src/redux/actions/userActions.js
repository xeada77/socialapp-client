import { SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI } from './../types';
import axios from 'axios';

export const loginUser = async (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
        const response = await axios.post('/login', userData);
        console.log(response.data);
        const FBIdToken = `Bearer ${response.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['authorization'] = FBIdToken;
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
        });
        //console.log(this.state);
    }
};

export const getUserData = async () => (dispatch) => {
    try {
        const response = await axios.get('/user');
        dispatch({
            type: SET_USER,
            payload: response.data
        });
    } catch (err) {
        console.log(err);
    }
    
}