import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';
import DesignerDetail from '../../01_FirstTab/User/designerDetailScreen';

function DetailBrandingScreen({ navigation, route }) {
  const { info } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <CardStyle styleLists={info.brandingStyles} isUser={true} height={400} />
        <CardInfo info={info} navigation={navigation} />
        <View style={styles.line}></View>
        <DesignerDetail branding={info} />
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
});

export default DetailBrandingScreen;
