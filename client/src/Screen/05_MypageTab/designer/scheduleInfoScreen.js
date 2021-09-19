import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Loading from '../../../Components/Common/loading';

// API
import ScheduleInfoAPI from '../../../Api/scheduleInfo';

function ScheduleInfoScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const [scheduleInfo, setScheduleInfo] = useState();
  useEffect(() => {
    async function fetchMode() {
      const scheduleInfo = await ScheduleInfoAPI.getScheduleInfoByDesignerId(user.id);
      if (scheduleInfo && scheduleInfo.length > 0) {
        setScheduleInfo(scheduleInfo[0]);
      }
    }
    fetchMode();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>주간 시술 스케줄 관리하기</Text>
      </View>
      {scheduleInfo ? (
        scheduleInfo.weeklySchedule.map((item, index) => {
          return (
            <View style={styles.tagBox} key={index}>
              <View style={styles.dayTag}>
                <Text style={{ color: 'white' }}>{item.date}</Text>
              </View>
              {item.timeArray && item.timeArray.length ? (
                <>
                  <View style={styles.tag}>
                    <Text style={{ color: '#8D8D8D' }}>{item.timeArray[0]}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={{ color: '#8D8D8D' }}>{item.timeArray[1]}</Text>
                  </View>
                </>
              ) : (
                <View style={styles.tag}>
                  <Text style={{ color: '#8D8D8D' }}>휴무</Text>
                </View>
              )}
            </View>
          );
        })
      ) : (
        <View style={styles.noScheduleInfoBox}>
          <Text style={styles.noScheduleInfoText}>아직 주간 시술 스케줄이 설정되지 않았어요!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScheduleInfo')}>
            <View style={styles.scheduleRegisterButton}>
              <Text style={styles.scheduleRegisterButtonText}>주간 시술 스케줄 설정하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

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
    marginLeft: 15,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 2,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#0A0A32',
    borderRadius: 2,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noScheduleInfoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8D8D8D',
    marginTop: 20,
  },
  noScheduleInfoText: {
    color: '#8D8D8D',
  },
  scheduleRegisterButton: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    height: 30,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0A32',
  },
  scheduleRegisterButtonText: {
    color: 'white',
  },
});
export default ScheduleInfoScreen;
