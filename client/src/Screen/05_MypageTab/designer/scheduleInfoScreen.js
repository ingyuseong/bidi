import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// API
import ScheduleInfoAPI from '../../../Api/scheduleInfo';

function ScheduleInfoScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const [scheduleInfo, setScheduleInfo] = useState();
  useEffect(() => {
    async function fetchMode() {
      const scheduleInfo = await ScheduleInfoAPI.getScheduleInfoByDesignerId(user.id);
      setScheduleInfo(scheduleInfo);
    }
    fetchMode();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>주간 시술 스케줄 설정하기</Text>
        <View style={styles.tagBox}>
          <View style={styles.tag}>
            <Text style={{ color: '#8D8D8D' }}>10:30</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: '#8D8D8D' }}>11:00</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: '#8D8D8D' }}>11:30</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: '#8D8D8D' }}>12:00</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: '#8D8D8D' }}>12:30</Text>
          </View>
        </View>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.title}>시간별 스케줄 직접 등록하기</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  textBox: {
    width: '100%',
    margin: 15,
    marginTop: 30,
    marginBottom: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ScheduleInfoScreen;
