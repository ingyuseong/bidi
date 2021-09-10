import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import userReducer from '../User';
import proposalReducer from '../Proposal';
import bidReducer from '../Bid';
import matchingReducer from '../Matching';
import matchingHistoryReducer from '../MatchingHistory';
import brandingReducer from '../Branding';
import styleScrapReducer from '../StyleScrap';
import styleReducer from '../Style';

import customerProposalReducer from '../Customer/Proposal';
import customerStyleReducer from '../Customer/Style';
import customerBrandingReducer from '../Customer/Branding';
import customerBidReducer from '../Customer/Bid';
import customerStyleScrapReducer from '../Customer/StyleScrap';
import customerMatchingReducer from '../Customer/Matching';
import customerMatchingHistoryReducer from '../Customer/MatchingHistory';

import scheduleInfoReducer from '../Designer/ScheduleInfo';

// import designerProposalReducer from '../Designer/Proposal';
// import designerBidReducer from '../Designer/Bid';
// import designerMatchingReducer from '../Designer/Matching';
// import designerMatchingHistoryReducer from '../Designer/MatchingHistory';
// import designerBrandingReducer from '../Designer/Branding';
// import designerStyleScrapReducer from '../Designer/StyleScrap';
// import designerStyleReducer from '../Designer/Style';

const rootReducer = combineReducers({
  user: userReducer,
  proposal: proposalReducer,
  branding: brandingReducer,
  bid: bidReducer,
  styleScrap: styleScrapReducer,
  matching: matchingReducer,
  matchingHistory: matchingHistoryReducer,
  style: styleReducer,
  customerProposal: customerProposalReducer,
  customerStyle: customerStyleReducer,
  customerBranding: customerBrandingReducer,
  customerBid: customerBidReducer,
  customerStyleScrap: customerStyleScrapReducer,
  customerMatching: customerMatchingReducer,
  customerMatchingHistory: customerMatchingHistoryReducer,
  scheduleInfo: scheduleInfoReducer,
  designer: {
    user: userReducer,
    proposal: proposalReducer,
    branding: brandingReducer,
    bid: bidReducer,
    styleScrap: styleScrapReducer,
    matching: matchingReducer,
    matchingHistory: matchingHistoryReducer,
    style: styleReducer,
  },
});
const globalStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};
export default globalStore;
