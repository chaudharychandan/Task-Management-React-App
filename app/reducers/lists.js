import { combineReducers } from 'redux';

import {
  ADD_LIST,
  DELETE_LIST,
  ADD_CARD,
  DELETE_CARD,
  DELETE_BOARD
} from '../actions/types';

const addListEntry = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return {
    ...state,
    [id]: payload
  };
};

const deleteListEntry = (state, action) => {
  const { payload: { id } } = action;
  const { [id]: list, ...rest } = state;

  return rest;
}

const deleteListEntries = (state, action) => {
  const { payload: { id } } = action;
  return Object.keys(state).reduce((newListsById, listId) => {
    state[listId].boardId === id ? Function.prototype : newListsById[listId] = state[listId];
    return newListsById;
  }, {});
}

const listsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_LIST:
      return addListEntry(state, action);
    case DELETE_LIST:
      return deleteListEntry(state, action);
    case ADD_CARD:
      return addCard(state, action);
    case DELETE_CARD:
      return deleteCard(state, action);
    case DELETE_BOARD:
      return deleteListEntries(state, action);
    default:
      return state;
  }
};

const addListId = (state, action) => {
  const { payload: { id } } = action;
  return state.concat(id);
};

const deleteListId = (state, action) => {
  const { payload: { id } } = action;
  return state.filter((item) => item !== id);
}

const deleteListIds = (state, action) => {
  const { payload: { lists } } = action;
  return state.filter((listId) => {
    return lists.indexOf(listId) < 0;
  });
}

const allLists = (state = [], action) => {
  switch (action.type) {
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

const addCard = (state, action) => {
  const { payload: { listId, ...card } } = action;
  const list = state[listId];

  return {
    ...state,
    [listId]: {
      ...list,
      cards: list.cards.concat(card)
    }
  };
};

const deleteCard = (state, action) => {
  const { payload: { listId, id } } = action;
  const list = state[listId];

  return {
    ...state,
    [listId]: {
      ...list,
      cards: list.cards.filter((card) => card.id !== id)
    }
  };
};

const listsReducer = combineReducers({
    byId : listsById,
    allIds : allLists
});

export default listsReducer;
