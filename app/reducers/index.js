import { combineReducers } from 'redux';
import boardsReducer from './boards';
import listsReducer from './lists';

const App = combineReducers({
  boards: boardsReducer,
  lists: listsReducer
});

export default App;
