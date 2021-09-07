import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import userReducer from '../User';
import bidReducer from '../Bid';
import matchingReducer from '../Matching';
import matchingHistoryReducer from '../MatchingHistory';
import brandingReducer from '../Branding';
import styleScrapReducer from '../StyleScrap';
import styleReducer from '../Style';

// import proposalReducer as customerProposalReducer from '../Customer/Proposal';
// import customerBidReducer from '../Customer/Bid';
// import customerMatchingReducer from '../CustomerMatching';
// import customerMatchingHistoryReducer from '../Customer/MatchingHistory';
// import customerBrandingReducer from '../Customer/Branding';
// import customerStyleScrapReducer from '../Customer/StyleScrap';
// import customerStyleReducer from '../Customer/Style';

import designerProposalReducer from '../Designer/Proposal';
// import designerBidReducer from '../Designer/Bid';
// import designerMatchingReducer from '../Designer/Matching';
// import designerMatchingHistoryReducer from '../Designer/MatchingHistory';
// import designerBrandingReducer from '../Designer/Branding';
// import designerStyleScrapReducer from '../Designer/StyleScrap';
// import designerStyleReducer from '../Designer/Style';

const rootReducer = combineReducers({
  user: userReducer,
  branding: brandingReducer,
  bid: bidReducer,
  styleScrap: styleScrapReducer,
  matching: matchingReducer,
  matchingHistory: matchingHistoryReducer,
  style: styleReducer,
  customer: {
    user: userReducer,
    proposal: designerProposalReducer,
    branding: brandingReducer,
    bid: bidReducer,
    styleScrap: styleScrapReducer,
    matching: matchingReducer,
    matchingHistory: matchingHistoryReducer,
    style: styleReducer,
  },
  designer: {
    user: userReducer,
    proposal: designerProposalReducer,
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
