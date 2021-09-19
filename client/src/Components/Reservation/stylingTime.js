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
import { dayFormating } from '../../Lib/utils';
import { DATE_SKELETON } from '../../Lib/constant';

import TimeSpecific from './timeSpecific';

function StylingTime({ navigation, setStyleTime, styleTime }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const [selectedDate, setSelectedDate] = useState(DATE_SKELETON);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const selectDate = (id, year, month, date, day, index) => {
    setSelectedDate(
      selectedDate.map((item) =>
        item.id == id ? { ...item, selected: true } : { ...item, selected: false },
      ),
    );
    setSelectedDay(day);
    setIsClicked(true);
    if (!index) {
      // 오늘이면
      setIsToday(true);
    } else {
      setIsToday(false);
    }
    setStyleTime(null);
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
      <TimeSpecific
        selectedDay={selectedDay}
        isClicked={isClicked}
        isToday={isToday}
        setStyleTime={setStyleTime}
        styleTime={styleTime}
      />
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
