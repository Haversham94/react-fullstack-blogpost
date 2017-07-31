import axios from 'axios';

import { BACKEND_URL } from '../constants';
import { FETCH_POSTS } from './types';

export const fetchPosts = () => {
    const request = axios.get(`${BACKEND_URL}/`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
};
