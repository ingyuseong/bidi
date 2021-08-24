import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from '../User/reducer';
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers({ user: userReducer });
const globalStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};
export default globalStore;
