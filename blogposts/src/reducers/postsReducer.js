import _ from 'lodash';

import { FETCH_POSTS } from '../actions/types';

const initialState = {};
export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}
