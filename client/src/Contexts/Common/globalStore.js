import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import userReducer from '../User';
import scheduleInfoReducer from '../Designer/ScheduleInfo';

import customerProposalReducer from '../Customer/Proposal';
import customerStyleReducer from '../Customer/Style';
import customerBrandingReducer from '../Customer/Branding';
import customerBidReducer from '../Customer/Bid';
import customerStyleScrapReducer from '../Customer/StyleScrap';
import customerMatchingReducer from '../Customer/Matching';
import customerMatchingHistoryReducer from '../Customer/MatchingHistory';

import designerProposalReducer from '../Designer/Proposal';
import designerBidReducer from '../Designer/Bid';
import designerMatchingReducer from '../Designer/Matching';
import designerMatchingHistoryReducer from '../Designer/MatchingHistory';
import designerBrandingReducer from '../Designer/Branding';
import designerStyleScrapReducer from '../Designer/StyleScrap';
import designerStyleReducer from '../Designer/Style';

const rootReducer = combineReducers({
  user: userReducer,
  scheduleInfo: scheduleInfoReducer,

  customerProposal: customerProposalReducer,
  customerStyle: customerStyleReducer,
  customerBranding: customerBrandingReducer,
  customerBid: customerBidReducer,
  customerStyleScrap: customerStyleScrapReducer,
  customerMatching: customerMatchingReducer,
  customerMatchingHistory: customerMatchingHistoryReducer,

  designerProposal: designerProposalReducer,
  designerBranding: designerBrandingReducer,
  designerBid: designerBidReducer,
  designerStyleScrap: designerStyleScrapReducer,
  designerMatching: designerMatchingReducer,
  designerMatchingHistory: designerMatchingHistoryReducer,
  designerStyle: designerStyleReducer,
});
const globalStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};
export default globalStore;
