import {
  ADD_LIST
} from './types';

export const addList = ({ boardId, list }) => {
  const id = `${+new Date()}`;
  return {
    type: ADD_LIST,
    payload: { boardId, id, ...list, cards: [] }
  };
};
