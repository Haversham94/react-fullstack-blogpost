import axios from 'axios';
import {
    FETCH_POSTS,
    CREATE_POSTS,
    FETCH_POST,
    DELETE_POST,
    AUTH_USER
} from './types';

export const fetchPosts = () => {
    const request = axios.get('/api/posts');
    return {
        type: FETCH_POSTS,
        payload: request
    };
};

export const createPosts = (values, cb) => {
    const request = axios.post('/api/posts', values).then(() => {
        cb();
    });
    return {
        type: CREATE_POSTS,
        payload: request
    };
};

export const fetchPost = postId => {
    const request = axios.get(`/api/posts/${postId}`);
    return {
        type: FETCH_POST,
        payload: request
    };
};

export const deletePost = (postId, cb) => {
    axios.delete(`/api/posts/${postId}`).then(() => {
        cb();
    });
    return {
        type: DELETE_POST,
        payload: postId
    };
};

export const signinUser = ({ email, password }, redirect) => {
    return dispatch => {
        axios
            .post(`/api/signin`, { email, password })
            .then(response => {
                // set auth to true
                dispatch({ type: AUTH_USER });
                // store the token to localStorage for futur use
                localStorage.setItem('token', response.data);
                redirect();
            })
            .catch(error => {});
    };
};
