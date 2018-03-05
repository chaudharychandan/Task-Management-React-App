import { combineReducers } from 'redux';

import {
  ADD_LIST,
  ADD_CARD,
  DELETE_CARD
} from '../actions/types';

const addListEntry = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return {
    ...state,
    [id]: payload
  };
};

const listsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_LIST:
      return addListEntry(state, action);
    case ADD_CARD:
      return addCard(state, action);
    case DELETE_CARD:
      return deleteCard(state, action);
    default:
      return state;
  }
};

const addListId = (state, action) => {
  const { payload: { id } } = action;
  return state.concat(id);
};

const allLists = (state = [], action) => {
  switch (action.type) {
    case ADD_LIST:
      return addListId(state, action);
    default:
      return state;
  }
};

const addCard = (state, action) => {
  const { payload: { listId, id } } = action;
  const list = state[listId];

  return {
    ...state,
    [listId]: {
      ...list,
      cards: list.cards.concat(id)
    }
  };
};

const deleteCard = (state, action) => {
  const { payload: { listId, index } } = action;
  const list = state[listId];

  return {
    ...state,
    [listId]: {
      ...list,
      cards: list.cards.slice(0, index).concat(list.cards.slice(index+1))
    }
  };
};

const listsReducer = combineReducers({
    byId : listsById,
    allIds : allLists
});

export default listsReducer;
