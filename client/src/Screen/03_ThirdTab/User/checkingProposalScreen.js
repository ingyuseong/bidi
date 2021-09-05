import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Screens
import CreateProposalScreen from './createProposalScreen';
import RegisteredProposalScreen from './registeredProposalScreen';
import MatchingExistScreen from './MatchingExistScreen';

// Components
import Loading from '../../../Components/Common/loading';

// Redux Action
import { getProposalAsync } from '../../../Contexts/Proposal/action';
import { getMatchingByCustomerId } from '../../../Contexts/Matching/action';

function CheckingProposalScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const {
    data: proposal,
    loading: proposalLoading,
    error: proposalError,
  } = useSelector((state) => state.proposal);
  const {
    data: matching,
    loading: matchingLoading,
    error: matchingError,
  } = useSelector((state) => state.matching);
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProposalAsync());
    dispatch(getMatchingByCustomerId(user.id));
  }, [dispatch]);
  if (proposalLoading || matchingLoading || proposalError || matchingError)
    return <Loading matchingError />;
  return (
    <>
      {proposal && proposal.length > 0 ? (
        <RegisteredProposalScreen navigation={navigation} />
      ) : matching && matching.length > 0 ? (
        <MatchingExistScreen navigation={navigation} />
      ) : (
        <CreateProposalScreen navigation={navigation} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 60,
  },
});

export default CheckingProposalScreen;
