import { combineReducers } from 'redux';

import {
  ADD_CARD,
  DELETE_CARD
} from '../actions/types';

const addCardEntry = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return {
    ...state,
    [id]: payload
  };
};

const deleteCardEntry = (state, action) => {
  const { id } = action;
  const { [id]: omit, ...res } = state;

  return res;
};

const cardsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD:
      return addCardEntry(state, action);
    case DELETE_CARD:
      return deleteCardEntry(state, action);
    default:
      return state;
  }
};

const addCardId = (state, action) => {
  const { payload: { id } } = action;
  return state.concat(id);
};

const deleteCardId = (state, action) => {
  const { payload: { index } } = action;
  return state.slice(0, index).concat(state.slice(index+1));
}

const allCards = (state = [], action) => {
  switch (action.type) {
    case ADD_CARD:
      return addCardId(state, action);
    case DELETE_CARD:
      return deleteCardId(state, action);
    default:
      return state;
  }
};

const cardsReducer = combineReducers({
    byId : cardsById,
    allIds : allCards
});

export default cardsReducer;
