import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, POST_SCREAM } from './../types';

const initialState = {
    loading: false,
    errors: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                loading: false
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
        
    }
}