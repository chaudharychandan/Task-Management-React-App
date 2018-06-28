import { combineReducers } from 'redux';
import boardsReducer from './boards';
import listsReducer from './lists';
import profileReducer from './profile';

const App = combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  user: profileReducer
});

export default App;
