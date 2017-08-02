import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postsReducer from './postsReducer';
import authReducer from './authReducer';

export default combineReducers({
    posts: postsReducer,
    form: formReducer,
    auth: authReducer
});
