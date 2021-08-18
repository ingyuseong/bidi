import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

function CheckingProposalScreen({ navigation }) {
  const [animating] = useState(true);
  const getProposalInfo = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/proposal/user/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data && Object.keys(result.data).length !== 0) {
          navigation.replace('ProposalRegistered');
        } else {
          navigation.replace('Intro');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      getProposalInfo(user);
    }
    fetchMode();
  }, []);

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
