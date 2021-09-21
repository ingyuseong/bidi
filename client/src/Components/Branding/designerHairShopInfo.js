import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function DesignerHairShopInfo({ branding }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>헤어샵</Text>
        </View>
        <Text>{branding.shop_name}</Text>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>연락처</Text>
        </View>
        <Text>{branding.shop_number}</Text>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>운영 시간</Text>
        </View>
        <Text>{branding.operation_time}</Text>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>휴무일</Text>
        </View>
        <Text>{branding.break_time}</Text>
      </View>
      <View style={[styles.extraInfoBox, styles.infoBox]}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>부가정보</Text>
        </View>
        <View style={styles.extraInfoArea}>
          {branding.extra_info.map((item, index) => (
            <View style={styles.checkExtraInfoItem} key={index}>
              <Text style={styles.checkExtraInfoText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>위치</Text>
        </View>
        <Text>
          {branding.address.address} {branding.address.detailAddress}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  infoBox: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  titleTextArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    width: '20%',
  },
  checkExtraInfoItem: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    marginRight: 8,
    backgroundColor: '#DBDBDB',
    padding: 8,
    height: 35,
    marginBottom: 8,
  },
  extraInfoBox: {
    alignItems: 'center',
  },
  extraInfoArea: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '80%',
    marginTop: 8,
  },
});

export default DesignerHairShopInfo;
