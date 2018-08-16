import axios from 'axios';
import {
  ADD_CARD,
  DELETE_CARD,
  COMPLETE_CARD
} from './types';

import { DOMAIN } from '../config';

const url = `${DOMAIN}/api/v1/lists`;

export const addCard = ({ listId, card }) => async dispatch => {
  const { data } = await axios({
    method: 'patch',
    url: `${url}/${listId}`,
    data: { ...card, action: 'ADD' }
  });

  dispatch({
    type: ADD_CARD,
    payload: data
  });
};

export const deleteCard = ({ listId, _id }) => async dispatch => {
  const { data } = await axios({
    method: 'patch',
    url: `${url}/${listId}`,
    data: { _id, action: 'DELETE' }
  });

  dispatch({
    type: DELETE_CARD,
    payload: data
  });
};

export const updateCard = ({ listId, card }) => async dispatch => {
  const { data } = await axios({
    method: 'patch',
    url: `${url}/${listId}`,
    data: { ...card, action: 'UPDATE' }
  });

  dispatch({
    type: COMPLETE_CARD,
    payload: data
  });
};