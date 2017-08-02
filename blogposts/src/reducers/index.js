import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import postsReducer from './postsReducer';
import authReducer from './authReducer';

export default combineReducers({
    posts: postsReducer,
    form: formReducer,
    auth: authReducer,
    router: routerReducer
});
