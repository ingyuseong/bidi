import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { convertDate } from '../../Lib/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ItemHeader({ navigation, info, screen, setModalVisible }) {
  const moreBtnHandler = () => {
    navigation.navigate('DetailBid', { info });
  };
  const deleteBtnHandler = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateArea}>
        <Text style={styles.dateText}>{convertDate(info.created_at)}</Text>
      </View>
      {screen === 'branding' ? (
        <TouchableOpacity style={styles.btnArea} onPress={deleteBtnHandler}>
          <Ionicons name="ellipsis-vertical" size={15} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnArea} onPress={moreBtnHandler}>
          <Text style={styles.btnText}>더보기</Text>
          <Ionicons name="chevron-forward" size={15} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 17,
  },
  btnArea: {
    flexDirection: 'row',
  },
  btnText: {
    color: '#0A0A32',
    fontSize: 14,
    lineHeight: 17,
  },
});

export default ItemHeader;
