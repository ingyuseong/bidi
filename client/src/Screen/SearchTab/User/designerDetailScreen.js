import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import CardInfo from '../../../Components/Card/cardInfo';
import DesignerHistory from './designerHistoryScreen';
import DesignerStyleScreen from './designerStyleScreen';

function DesignerDetail({ info }) {
  const [tab, setTab] = useState('tab1');
  const tabHandler = () => {
    const nextTab = tab == 'tab1' ? 'tab2' : 'tab1';
    setTab(nextTab);
  };

  return (
    <ScrollView>
      <CardInfo info={info} />
      <View style={styles.line}></View>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={[styles.tab, tab == 'tab1' && styles.active]}>
            <TouchableOpacity onPress={tabHandler}>
              <Text style={[styles.headerTitle, tab == 'tab1' && styles.active]}>대표 스타일</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tab, tab == 'tab2' && styles.active]}>
            <TouchableOpacity onPress={tabHandler}>
              <Text style={[styles.headerTitle, tab == 'tab2' && styles.active]}>
                매칭 히스토리
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabLine}></View>
        <View style={styles.contentContainer}>
          {tab == 'tab1' ? <DesignerStyleScreen info={info} /> : <DesignerHistory info={info} />}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 6,
    borderColor: '#e2e2e2',
  },
  contentContainer: {
    marginLeft: 20,
    marginRight: 20,
  },

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

export default DesignerDetail;
