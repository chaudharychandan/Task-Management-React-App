import { combineReducers } from 'redux';

import {
  ADD_BOARD,
  DELETE_BOARD,
  ADD_LIST,
  DELETE_LIST
} from '../actions/types';

const addBoardEntry = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return {
    ...state,
    [id]: payload
  };
}

const deleteBoardEntry = (state, action) => {
  const { payload: { id } } = action;
  const { [id]: omit, ...rest } = state;
  
  return rest;
}

const boardsById = (state = {}, action) => {
  switch (action.type) {
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
  const { payload: { id } } = action;
  return state.concat(id);
}

const deleteBoardId = (state, action) => {
  const { payload: { id } } = action;
  return state.filter((item) => id !== item);
}

const allBoards = (state = [], action) => {
  switch (action.type) {
    case ADD_BOARD:
      return addBoardId(state, action);
    case DELETE_BOARD:
      return deleteBoardId(state, action);
    default:
      return state;
  }
}

const addList = (state = {}, action) => {
  const { payload: { boardId, id } } = action;
  const board = state[boardId];

  return {
    ...state,
    [boardId]: {
      ...board,
      lists: board.lists.concat(id)
    }
  };
}

const deleteList = (state = {}, action) => {
  const { payload: { boardId, id } } = action;
  const { [boardId]: board } = state;
  const { lists } = board;

  const updatedLists = lists.filter((item) => item !== id);

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
