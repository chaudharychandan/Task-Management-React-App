import axios from 'axios';
import { FETCH_PROFILE } from './types';

import { DOMAIN } from '../config';

const url = `${DOMAIN}/api/v1/profile`;

export const fetchProfile = () => async dispatch => {
  const { data } = await axios.get(url);

  dispatch({
    type: FETCH_PROFILE, payload: data
  });
};
