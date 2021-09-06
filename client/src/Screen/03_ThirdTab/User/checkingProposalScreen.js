import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Redux Action
import ProposalAPI from '../../../Api/proposal';
import { getProposal } from '../../../Contexts/Proposal/action';

function CheckingProposalScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchMode() {
      const proposal = await ProposalAPI.getProposalByUserId(user.id);
      if (proposal && Object.keys(proposal).length !== 0) {
        await dispatch(getProposal(proposal));
        setAnimating(false);
        navigation.replace('ProposalRegistered');
      } else {
        setAnimating(false);
        navigation.replace('Intro');
      }
    }
    fetchMode();
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color=""
        size="large"
        style={styles.activityIndicator}
      />
    </View>
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
