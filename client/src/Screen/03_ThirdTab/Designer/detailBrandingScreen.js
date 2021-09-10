import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';
import DesignerStyle from '../../../Components/Branding/designerStyle';
import DesignerHistory from '../../../Components/Branding/designerHistory';

function DetailBrandingScreen({ navigation, route }) {
  const { info } = route.params;
  const [tab, setTab] = useState('tab1');
  const tabHandler = () => {
    const nextTab = tab == 'tab1' ? 'tab2' : 'tab1';
    setTab(nextTab);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <CardStyle styleLists={info.brandingStyles} isUser={true} height={400} />
        <CardInfo info={info} navigation={navigation} />
        <View style={styles.line}></View>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={[styles.tab, tab == 'tab1' && styles.active]}>
              <TouchableOpacity onPress={tabHandler}>
                <Text style={[styles.headerTitle, tab == 'tab1' && styles.active]}>
                  대표 스타일
                </Text>
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
            {tab == 'tab1' ? (
              <DesignerStyle navigation={navigation} branding={info} isUser={false} />
            ) : (
              <DesignerHistory branding={info} isUser={false} />
            )}
          </View>
        </ScrollView>
      </ScrollView>
      <TouchableOpacity
        style={styles.editIconArea}
        onPress={() => {
          navigation.push('EditBranding', { info });
        }}>
        <Icon name="pencil" size={30} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: 'white',
  },
  line: {
    height: 9,
    backgroundColor: '#F4F4F4',
  },
  bidiBtn: {
    position: 'absolute',
    backgroundColor: '#FF533A',
    width: 50,
    height: 50,
    bottom: -25,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidiIcon: {
    color: 'white',
  },
  styleContainer: {
    flex: 1.5,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
  editIconArea: {
    width: 65,
    height: 65,
    backgroundColor: '#0A0A32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  editIcon: {
    color: 'white',
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

export default DetailBrandingScreen;
