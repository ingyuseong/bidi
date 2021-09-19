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

function StylingTime({ navigation }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  // const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(DATE_SKELETON);
  const selectDate = (id, year, month, date, day) => {
    console.log(year, month + 1, date, day);
    setSelectedDate(
      selectedDate.map((item) =>
        item.id == id ? { ...item, selected: true } : { ...item, selected: false },
      ),
    );
  };
  const now = new Date();
  const timeTable = DATE_SKELETON.map((item, index) => {
    const year = now.getFullYear();
    const month = now.getUTCMonth();
    const date = now.getDate();
    const day = now.getDay();
    now.setDate(now.getDate() + 1);
    return (
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
          onPress={() => selectDate(item.id, year, month, date, day)}>
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
      </View>
    );
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={true}>
      <View style={styles.timeTableContainer}>{timeTable}</View>
    </ScrollView>
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
    justifyContent: 'center',
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
