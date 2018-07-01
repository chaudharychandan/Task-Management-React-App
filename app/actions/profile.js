import axios from 'axios';
import { FETCH_PROFILE } from './types';

import { DOMAIN } from '../config';

const url = `${DOMAIN}/api/v1/profile`;

export const fetchProfile = () => async dispatch => {
  try {
    const { data } = await axios.get(url);

    dispatch({
      type: FETCH_PROFILE, payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE, payload: false
    });
  }
};
