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

function TimeSpecific({ setStyleTime, selectedDay, isClicked, isToday, year, month, date }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const [time, setTime] = useState(null);
  let timeLabel = [];
  const timeFormating = (timefloat) => {
    let remainder = (Number(timefloat) % 1).toFixed(2);
    let minutes = remainder * 60 ? remainder * 60 : '00';
    let hours = timefloat - remainder;
    return `${hours}:${minutes}`;
  };
  if (matching && matching.length > 0 && isClicked) {
    let startTime = Number(
      matching[0].bid.user.scheduleInfo.weeklySchedule[selectedDay].timeArray[0],
    );
    const endTime = Number(
      matching[0].bid.user.scheduleInfo.weeklySchedule[selectedDay].timeArray[1],
    );
    if (isToday) {
      startTime = Math.max(new Date().getHours(), startTime);
    }
    if (startTime && endTime) {
      for (var i = startTime; i <= endTime; i += 0.5) {
        const j = i;
        timeLabel.push(
          <TouchableOpacity
            style={time == j ? { ...styles.timeTag, backgroundColor: '#FF533A' } : styles.timeTag}
            key={j}
            onPress={() => {
              setTime(j);
              const submitTime = new Date(year, month, date, Math.floor(j), (j % 1) * 60, 0);
              setStyleTime(submitTime);
            }}>
            <Text style={time == j && { color: 'white', fontWeight: 'bold' }}>
              {timeFormating(i)}
            </Text>
          </TouchableOpacity>,
        );
      }
    } else {
      timeLabel.push(
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
      {timeLabel && timeLabel.length > 0 ? (
        timeLabel
      ) : (
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
