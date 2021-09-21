import React, { useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';

function TimeSpecific({ setStyleTime, scheduleList, year, month, date, day, isClicked, isToday }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 라벨을 활성화 하기 위한 상태

  // 9.5 -> '9:30', 21 -> '21:00' 로 포맷팅하기 위한 함수
  const timeFormating = (timefloat) => {
    let remainder = (Number(timefloat) % 1).toFixed(2); //
    let minutes = remainder * 60 ? remainder * 60 : '00';
    let hours = timefloat - remainder;
    return `${hours}:${minutes}`;
  };

  // timeLabel이 눌려졌을때 실행되는 함수
  const selectTimeLabel = (timeFloat) => {
    setSelectedTime(timeFloat); // 해당 timeLabel을 활성화

    // 최상위 예약 컴포넌트의 style_time을 설정
    const submitTime = new Date(year, month, date, Math.floor(timeFloat), (timeFloat % 1) * 60, 0);
    setStyleTime(submitTime);
  };

  /* 예약 가능한 timeLabel을 렌더링 하기 위한 작업 */
  // # 먼저 빈 timeLabelList 배열을 선언해준다
  let timeLabelList = [];

  // # TimeLabel에 가능한 시간 정보를 조건에 맞게 필터링하여 push해 줄 것!
  if (matching && matching.length > 0 && isClicked) {
    /* 
      1. 디자이너의 주간 시술 스케줄 반영
        matching의 scheduleInfo 에는 디자이너의 일(0)~토(6) 의 '주간 시술 스케줄(weeklySchedule)'이 담겨있고, 배열로 접근 가능함
        weeklySchedule[day]에는 timeArray가 담겨있는데, [9, 17.5]의 형태로 (시작스케줄, 종료스케줄)로 구성되어 있음.
        -> String이므로 Number로 전환해서 사용
    */
    let startTime = Number(matching[0].bid.user.scheduleInfo.weeklySchedule[day].timeArray[0]);
    const endTime = Number(matching[0].bid.user.scheduleInfo.weeklySchedule[day].timeArray[1]);

    // 만약 오늘을 선택한 경우 현재 시간과, startTime중 더 늦은 시간으로 선택!
    if (isToday) {
      const possibleTime = new Date().getHours() + 1; // 현재 시간 + 1을 해주어 현재 시간대에는 예약을 못하도록 방지(시간적 문제)
      startTime = Math.max(possibleTime, startTime);
    }

    /*
      2. 디자이너의 휴무, 이미 있는 스케줄 반영하여 timeLabelList 생성
        - 휴무일 경우에는 startTime과 endTime에 null이 할당되어 있음
        - scheduleList에는 이미 잡혀있는 schedule의 시간이 실수 형태로 배열로 들어있음 [9.5, 11, 16.5 ...] 등
    */
    if (startTime && endTime) {
      // StartTime 부터 0.5(30분)씩 돌면서 TimeLabel 생성
      for (var i = startTime; i <= endTime; i += 0.5) {
        // i를 할당하여 사용하는 이유는 i가 변함에 따라 i값은 컴포넌트에서 활용하기 부적합함
        const timeFloat = i;

        // 만약 timeFloat에 해당하는 시간에 스케줄이 없다면,
        if (!scheduleList.includes(timeFloat.toString())) {
          // timeLabelList에 가능한 시간으로 timeLabel을 만들어서 등록!
          timeLabelList.push(
            <TouchableOpacity
              style={
                selectedTime == timeFloat // 선택시 활성화를 위한 구문
                  ? { ...styles.timeTag, backgroundColor: '#FF533A' }
                  : styles.timeTag
              }
              key={timeFloat}
              onPress={() => selectTimeLabel(timeFloat)}>
              <Text style={selectedTime == timeFloat && { color: 'white', fontWeight: 'bold' }}>
                {timeFormating(timeFloat)}
              </Text>
            </TouchableOpacity>,
          );
        }
      }
    } else {
      timeLabelList.push(
        <View style={styles.timeTag} key={1}>
          <Text>디자이너 휴무</Text>
        </View>,
      );
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={styles.container}>
      {timeLabelList && timeLabelList.length > 0
        ? timeLabelList
        : isClicked && (
            <View style={styles.timeTag} key={1}>
              <Text>예약 마감</Text>
            </View>
          )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeTagBox: {
    width: '100%',
    height: 100,
    padding: 10,
    backgroundColor: '#f0f',
  },
  timeTag: {
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

export default TimeSpecific;
