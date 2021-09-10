import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

// Components
import DesignerStyle from '../../../Components/Branding/designerStyle';
import DesignerHistory from '../../../Components/Branding/designerHistory';

function DesignerDetailScreen({ branding, navigation }) {
  const [tab, setTab] = useState('tab1');
  const tabHandler = () => {
    const nextTab = tab == 'tab1' ? 'tab2' : 'tab1';
    setTab(nextTab);
  };
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
          <DesignerStyle navigation={navigation} branding={branding} isUser={true} />
        ) : (
          <DesignerHistory branding={branding} isUser={true} />
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
