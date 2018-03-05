import { combineReducers } from 'redux';

import {
  ADD_BOARD,
  ADD_LIST
} from '../actions/types';

const addBoardEntry = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return {
    ...state,
    [id]: payload
  };
}

const boardsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return addBoardEntry(state, action);
    case ADD_LIST:
      return addList(state, action);
    default:
      return state;
  }
}

const addBoardId = (state, action) => {
  const { payload: { id } } = action;
  return state.concat(id);
}

const allBoards = (state = [], action) => {
  switch (action.type) {
    case ADD_BOARD:
      return addBoardId(state, action);
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

const boardsReducer = combineReducers({
    byId : boardsById,
    allIds : allBoards
});

export default boardsReducer;
