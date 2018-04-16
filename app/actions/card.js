import axios from 'axios';
import {
  ADD_CARD,
  DELETE_CARD,
  DOMAIN
} from './types';

const url = `${DOMAIN}/api/v1/lists`;

export const addCard = ({ listId, card }) => async dispatch => {
  const { data } = await axios({
    method: 'patch',
    url: `${url}/${listId}`,
    data: card
  });

  dispatch({
    type: ADD_CARD,
    payload: data
  });
};

export const deleteCard = ({ listId, _id }) => async dispatch => {
  await axios({
    method: 'patch',
    url: `${url}/${listId}`,
    data: { _id }
  });

  dispatch({
    type: DELETE_CARD,
    payload: { listId, _id }
  });
};
