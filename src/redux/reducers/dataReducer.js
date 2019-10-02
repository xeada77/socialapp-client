import { SET_SCREAMS, SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SUBMIT_COMMENT} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function (state = initialState, action) { 
    let index;
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
            index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload;
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index, 1);
            return { ...state};
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SET_SCREAM:
            return {
            ...state,
            scream: action.payload 
            }
        case SUBMIT_COMMENT:
            index = state.screams.findIndex(scream => scream.screamId === action.payload.commentData.screamId);
            state.screams[index].commentCount += 1;
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload.commentData, ...state.scream.comments]
                }
            }
        default:
            return state;
    }
};
