import { combineReducers } from 'redux';

import {
  FETCH_BOARDS,
  ADD_BOARD,
  DELETE_BOARD,
  ADD_LIST,
  DELETE_LIST
} from '../actions/types';

const addBoardEntry = (state, action) => {
  const { payload } = action;
  const { _id } = payload;
  return {
    ...state,
    [_id]: payload
  };
}

const deleteBoardEntry = (state, action) => {
  const { payload: { _id } } = action;
  const { [_id]: omit, ...rest } = state;

  return rest;
}

const setBoardsById = (state, action) => {
  return action.payload.reduce((accumulator, board) => ({ ...accumulator, [board._id]: board }), {});
}

const boardsById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BOARDS:
      return setBoardsById(state, action);
    case ADD_BOARD:
      return addBoardEntry(state, action);
    case DELETE_BOARD:
      return deleteBoardEntry(state, action);
    case ADD_LIST:
      return addList(state, action);
    case DELETE_LIST:
      return deleteList(state, action);
    default:
      return state;
  }
}

const addBoardId = (state, action) => {
  const { payload: { _id } } = action;
  return state.concat(_id);
}

const deleteBoardId = (state, action) => {
  const { payload: { _id } } = action;
  return state.filter((item) => _id !== item);
}

const setBoardIds = (state, action) => {
  return action.payload.map((board) => board._id);
}

const allBoards = (state = [], action) => {
  switch (action.type) {
    case FETCH_BOARDS:
      return setBoardIds(state, action);
    case ADD_BOARD:
      return addBoardId(state, action);
    case DELETE_BOARD:
      return deleteBoardId(state, action);
    default:
      return state;
  }
}

const addList = (state = {}, action) => {
  const { payload: { boardId, _id } } = action;
  const board = state[boardId];

  return {
    ...state,
    [boardId]: {
      ...board,
      lists: board.lists.concat(_id)
    }
  };
}

const deleteList = (state = {}, action) => {
  const { payload: { boardId, _id } } = action;
  const { [boardId]: board } = state;
  const { lists } = board;

  const updatedLists = lists.filter((item) => item !== _id);

  return {
    ...state,
    [boardId]: {
      ...board,
      lists: updatedLists
    }
  }
}

const boardsReducer = combineReducers({
    byId : boardsById,
    allIds : allBoards
});

export default boardsReducer;
