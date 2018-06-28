import { combineReducers } from 'redux';

import {
  FETCH_PROFILE
} from '../actions/types';

const profile = (state = null, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return action.payload
    default:
      return state;
  }
};

const profileReducer = combineReducers({
  profile
});

export default profileReducer;
