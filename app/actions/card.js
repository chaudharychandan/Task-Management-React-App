import {
  ADD_CARD,
  DELETE_CARD
} from './types';

export const addCard = ({ listId, card }) => {
  const id = `${+new Date()}`;
  return {
    type: ADD_CARD,
    payload: { listId, id, ...card }
  };
};

export const deleteCard = ({ listId, id }) => {
  return {
    type: DELETE_CARD,
    payload: { listId, id }
  };
};
