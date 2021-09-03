import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import userReducer from '../User';
import proposalReducer from '../Proposal';
import bidReducer from '../Bid';
import matchingReducer from '../Matching';
import matchingHistoryReducer from '../MatchingHistory';
import brandingReducer from '../Branding';
import styleScrapReducer from '../StyleScrap';

const rootReducer = combineReducers({
  user: userReducer,
  proposal: proposalReducer,
  branding: brandingReducer,
  bid: bidReducer,
  styleScrap: styleScrapReducer,
  matching: matchingReducer,
  matchingHistory: matchingHistoryReducer,
});
const globalStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};
export default globalStore;
