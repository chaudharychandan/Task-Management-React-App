import { combineReducers } from 'redux';

import {
  FETCH_LISTS,
  ADD_LIST,
  DELETE_LIST,
  ADD_CARD,
  DELETE_CARD,
  COMPLETE_CARD,
  DELETE_BOARD
} from '../actions/types';

const setListsById = (state, action) => {
  return action.payload.reduce((accumulator, list) => ({ ...accumulator, [list._id]: list }), {});
}

const addListEntry = (state, action) => {
  const { payload } = action;
  const { _id } = payload;
  return {
    ...state,
    [_id]: payload
  };
};

const deleteListEntry = (state, action) => {
  const { payload: { _id } } = action;
  const { [_id]: list, ...rest } = state;

  return rest;
}

const deleteListEntries = (state, action) => {
  const { payload: { _id } } = action;
  return Object.keys(state).reduce((newListsById, listId) => {
    state[listId].boardId === _id ? Function.prototype : newListsById[listId] = state[listId];
    return newListsById;
  }, {});
}

const listsById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return setListsById(state, action);
    case ADD_LIST:
      return addListEntry(state, action);
    case DELETE_LIST:
      return deleteListEntry(state, action);
    case ADD_CARD:
      return updateList(state, action);
    case DELETE_CARD:
      return updateList(state, action);
    case COMPLETE_CARD:
      return updateList(state, action);
    case DELETE_BOARD:
      return deleteListEntries(state, action);
    default:
      return state;
  }
};

const addListId = (state, action) => {
  const { payload: { _id } } = action;
  return state.concat(_id);
};

const deleteListId = (state, action) => {
  const { payload: { _id } } = action;
  return state.filter((item) => item !== _id);
}

const deleteListIds = (state, action) => {
  const { payload: { lists } } = action;
  return state.filter((listId) => {
    return lists.indexOf(listId) < 0;
  });
}

const setListIds = (state, action) => {
  return action.payload.map((list) => list._id);
}

const allLists = (state = [], action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return setListIds(state, action);
    case ADD_LIST:
      return addListId(state, action);
    case DELETE_LIST:
      return deleteListId(state, action);
    case DELETE_BOARD:
      return deleteListIds(state, action);
    default:
      return state;
  }
};

const updateList = (state, action) => {
  const { payload } = action;
  const { _id } = payload;

  return {
    ...state,
    [_id]: payload
  };
};

const listsReducer = combineReducers({
    byId : listsById,
    allIds : allLists
});

export default listsReducer;
