import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import ItemHeader from '../../../Components/ListItem/itemHeader';
import ItemContent from '../../../Components/ListItem/itemContent';
import Line from '../../../Components/Common/line';

function HistroyListScreen({ matchingHistoryList, navigation }) {
  return (
    <ScrollView style={styles.container}>
      {matchingHistoryList.map((history, index) => (
        <View style={styles.historyContainer} key={index}>
          <ItemHeader
            navigation={navigation}
            info={history}
            screen="history"
            clickHandler={() => {
              navigation.navigate('HistoryDetail', { info: history });
            }}
          />
          <ItemContent info={history} navigation={navigation} screen="history" />
          <Line />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    height: 10,
    backgroundColor: '#f4f4f4',
  },
});

export default HistroyListScreen;
