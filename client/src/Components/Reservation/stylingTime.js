import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { dayFormating } from '../../Lib/utils';
import { DATE_SKELETON } from '../../Lib/constant';

import TimeSpecific from './timeSpecific';

// API
import ScheduleAPI from '../../Api/schedule';

function StylingTime({ navigation, setStyleTime }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const [scheduleList, setScheduleList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(DATE_SKELETON);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isToday, setIsToday] = useState(false);

  // 디자이너 스케줄 정보 조회 시
  const [loading, setLoading] = useState(false);

  // 유저 예약 버튼 누를 시에 전송될 시간 정보 틀
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(null);
  const selectDate = async (id, year, month, date, day, index) => {
    const body = {
      designer_id: matching[0].designer_id,
      year: year,
      month: month,
      date: date,
    };
    setLoading(true);
    const scheduleResult = await ScheduleAPI.getScheduleListByDate(body);
    setScheduleList(scheduleResult);
    setSelectedDate(
      selectedDate.map((item) =>
        item.id == id ? { ...item, selected: true } : { ...item, selected: false },
      ),
    );
    setYear(year);
    setMonth(month);
    setDate(date);
    setSelectedDay(day);
    setIsClicked(true);
    if (!index) {
      // 오늘이면
      setIsToday(true);
    } else {
      setIsToday(false);
    }
    setLoading(false);
  };
  const now = new Date();
  const timeTable = DATE_SKELETON.map((item, index) => {
    const year = now.getFullYear();
    const month = now.getUTCMonth();
    const date = now.getDate();
    const day = now.getDay();
    now.setDate(now.getDate() + 1);
    return (
      <View key={date}>
        <View style={styles.tagBox} key={date}>
          <View style={styles.dayTag}>
            <Text style={styles.dayTagText}>{dayFormating(day)}</Text>
          </View>
          <TouchableOpacity
            key={item.id}
            style={
              selectedDate[item.id].selected
                ? { ...styles.dateTag, backgroundColor: '#FF533A' }
                : styles.dateTag
            }
            onPress={() => selectDate(item.id, year, month, date, day, index)}>
            <Text
              key={date}
              style={
                selectedDate[item.id].selected
                  ? { ...styles.dateTagText, color: 'white' }
                  : styles.dateTagText
              }>
              {date}
            </Text>
          </TouchableOpacity>
          {index == 0 && <Text style={{ marginTop: 5 }}>오늘</Text>}
        </View>
      </View>
    );
  });

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <View style={styles.timeTableContainer}>{timeTable}</View>
      </ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TimeSpecific
          setStyleTime={setStyleTime}
          scheduleList={scheduleList}
          selectedDay={selectedDay}
          isClicked={isClicked}
          isToday={isToday}
          year={year}
          month={month}
          date={date}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timeTableContainer: {
    flexDirection: 'row',
  },
  tagBox: {
    marginTop: 10,
    marginRight: 10,
    width: 40,
    alignItems: 'center',
  },
  dayTag: {
    height: 25,
    justifyContent: 'center',
  },
  dayTagText: {
    fontSize: 17,
    color: '#8D8D8D',
  },
  dateTag: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  dateTagText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FF533A',
    borderRadius: 2,
    marginTop: 10,
    marginLeft: 12,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  priceTag: {
    marginRight: 25,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  locationInput: {
    width: '90%',
    height: 42,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: 'rgb(243,243,243)',
    padding: 10,
    zIndex: 2,
  },
});

export default StylingTime;
