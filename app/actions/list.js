import axios from 'axios';
import {
  FETCH_LISTS,
  ADD_LIST,
  DELETE_LIST,
  DOMAIN
} from './types';

const url = `${DOMAIN}/api/v1/lists`;

export const fetchLists = () => async dispatch => {
  const { data } = await axios.get(url);

  dispatch({
    type: FETCH_LISTS, payload: data
  });
}

export const addList = (list) => async dispatch => {
  const { data } = await axios({
    method: 'post',
    url,
    data: list
  });

  dispatch({
    type: ADD_LIST, payload: data
  });
};

export const deleteList = ({ _id }) => async dispatch => {
  const { data } = await axios.delete(`${url}/${_id}`);

  dispatch({
    type: DELETE_LIST,
    payload: data
  });
};
