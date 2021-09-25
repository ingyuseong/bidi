import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

// Components
import DesignerStyleScreen from './TabScreen/designerStyleScreen';
import DesignerHistoryScreen from './TabScreen/designerHistoryScreen';
import DesignerHairShopInfoScreen from './TabScreen/designerHairShopInfoScreen';

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
          <TouchableOpacity onPress={() => setTab('tab1')}>
            <Text style={[styles.headerTitle, tab == 'tab1' && styles.active]}>대표 스타일</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.tab, tab == 'tab2' && styles.active]}>
          <TouchableOpacity onPress={() => setTab('tab2')}>
            <Text style={[styles.headerTitle, tab == 'tab2' && styles.active]}>매칭 내역</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.tab, tab == 'tab3' && styles.active]}>
          <TouchableOpacity onPress={() => setTab('tab3')}>
            <Text style={[styles.headerTitle, tab == 'tab3' && styles.active]}>헤어샵 정보</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabLine}></View>
      <View style={styles.contentContainer}>
        {tab == 'tab1' ? (
          <DesignerStyleScreen navigation={navigation} branding={branding} isUser={false} />
        ) : tab == 'tab2' ? (
          <DesignerHistoryScreen branding={branding} isUser={false} />
        ) : (
          <DesignerHairShopInfoScreen branding={branding} />
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
    justifyContent: 'space-between',
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
