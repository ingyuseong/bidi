import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import CardStyle from '../../../Components/Card/cardStyle';
import CardInfo from '../../../Components/Card/cardInfo';
import DesignerHistoryScreen from './designerHistoryScreen';
import DesignerStyleScreen from './designerStyleScreen';

function DesignerDetailScreen({ info }) {
  const [tab, setTab] = useState('tab1');
  const [matchingHistoryList, setMatchingHistoryList] = useState([]);
  const getHistoryList = async () => {
    await fetch('http://127.0.0.1:3000' + `/api/matchingHistory/designer/${info.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.data) {
          await setMatchingHistoryList(result.data.matchingHistoryList);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const tabHandler = () => {
    const nextTab = tab == 'tab1' ? 'tab2' : 'tab1';
    setTab(nextTab);
  };
  useEffect(() => {
    getHistoryList();
  }, []);
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <View style={[styles.tab, tab == 'tab1' && styles.active]}>
          <TouchableOpacity onPress={tabHandler}>
            <Text style={[styles.headerTitle, tab == 'tab1' && styles.active]}>대표 스타일</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.tab, tab == 'tab2' && styles.active]}>
          <TouchableOpacity onPress={tabHandler}>
            <Text style={[styles.headerTitle, tab == 'tab2' && styles.active]}>매칭 히스토리</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabLine}></View>
      <View style={styles.contentContainer}>
        {tab == 'tab1' ? (
          <DesignerStyleScreen info={info} />
        ) : (
          <DesignerHistoryScreen info={info} matchingHistoryList={matchingHistoryList} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 6,
    borderColor: '#e2e2e2',
  },
  contentContainer: {},

  headerContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
  },
  tabLine: {
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  headerTitle: {
    fontSize: 20,
  },
  tab: {
    marginRight: 30,
  },
  active: {
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderColor: 'black',
    paddingBottom: 5,
  },
});

export default DesignerDetailScreen;
