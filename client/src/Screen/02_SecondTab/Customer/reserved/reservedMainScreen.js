import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

// Components
import Loading from '../../../../Components/Common/loading';
import ProposalUserInfo from '../../../../Components/Proposal/proposalUserInfo';

function ReservedMatchingScreen({ navigation }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const timeFormating = (style_time) => {
    const time = new Date(style_time);
    return {
      date: `${
        (time.getMonth() + 1).length == 2 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
      }월 ${time.getDate()}일`,
      time: `${time.getHours()}:${time.getMinutes()}`,
    };
  };
  if (!matching || !matching.length) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>현재 예약 정보</Text>
      </View>
      <View style={styles.tagBox}>
        <View style={styles.nameTag}>
          <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>날짜</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{timeFormating(matching[0].style_time).date}</Text>
        </View>
      </View>
      <View style={styles.tagBox}>
        <View style={styles.nameTag}>
          <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>시간</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{timeFormating(matching[0].style_time).time}</Text>
        </View>
      </View>
      <View style={styles.tagBox}>
        <View style={styles.nameTag}>
          <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>디자이너</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{matching[0].bid.user.nick_name}</Text>
        </View>
      </View>
      <View style={styles.tagBox}>
        <View style={styles.nameTag}>
          <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>스타일</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{matching[0].style.title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    padding: 20,
  },
  titleBox: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagBox: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  nameTag: {
    marginTop: 10,
    marginRight: 5,
    width: 60,
    height: 25,
    justifyContent: 'center',
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 2,
    marginTop: 10,
    // marginLeft: 12,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReservedMatchingScreen;
