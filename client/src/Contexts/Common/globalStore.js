import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import userReducer from '../User';
import proposalReducer from '../Proposal';
const rootReducer = combineReducers({ user: userReducer, proposal: proposalReducer });
const globalStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};
export default globalStore;
