import {
  FETCH_BOARDS,
  ADD_BOARD
} from './types';

export const fetchBoards = () => {
  return { type: FETCH_BOARDS };
}

export const addBoard = (board) => {
  const id = `${+new Date()}`;
  return {
    type: ADD_BOARD,
    payload: { ...board, id, lists: [] }
  }
}
