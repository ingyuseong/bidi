import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { convertDate } from '../../Lib/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ItemHeader({ info, screen, clickHandler }) {
  return (
    <View style={styles.container}>
      <View style={styles.dateArea}>
        <Text style={styles.dateText}>{convertDate(info.created_at)}</Text>
      </View>
      {screen === 'branding' ? (
        <TouchableOpacity style={styles.btnArea} onPress={clickHandler}>
          <Ionicons
            name={screen === 'branding' ? 'ellipsis-vertical' : 'chevron-forward'}
            size={15}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnArea} onPress={clickHandler}>
          <Text style={styles.btnText}>더보기</Text>
          <Ionicons name="chevron-forward" size={15} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
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
