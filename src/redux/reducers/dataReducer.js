import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function (state = initialState, action) { 
    switch (action.type) {
        case SET_SCREAMS:
            return {
                ...state,
                loading: false,
                screams: action.payload
            };
        case LOADING_DATA:
            return { ...state, loading: true };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            console.log(index);
            state.screams[index] = action.payload;
            return {
                ...state
            }
        default:
            return state;
    }
};
