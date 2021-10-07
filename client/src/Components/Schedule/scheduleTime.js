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
  const { data: user } = useSelector((state) => state.user);
  const [scheduleList, setScheduleList] = useState([]); // 디자이너의 해당 날짜의 schedule이 담길 상태(배열)
  const [selectedDate, setSelectedDate] = useState(DATE_SKELETON); // 선택된 날짜를 표현하기 위한 상태

  // 디자이너 스케줄 정보 조회 시
  const [loading, setLoading] = useState(false);

  // 예약 가능한 시간 목록을 띄워주기 위한 시간 정보 틀
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(0);

  // 시간 라벨 출력 제어에 세부적으로 필요한 상태
  const [isClicked, setIsClicked] = useState(false);
  const [isToday, setIsToday] = useState(false);

  /* 화면에서 날짜(숫자로 된 원) 누를 때마다 실행되는 함수 */
  /* # 중요!!! */
  const selectDate = async (id, year, month, date, day, index) => {
    setLoading(true); // 0. 일별 숫자를 누르면 먼저 로딩이 활성화 된다.

    // 1. 디자이너의 해당 날짜(년, 월, 일)에 등록된 스케줄을 불러오기
    const body = {
      designer_id: user.id,
      year: year,
      month: month,
      date: date,
    };
    const scheduleResult = await ScheduleAPI.getScheduleListByDate(body);
    setScheduleList(scheduleResult);

    // 2. 선택된 일자를 주황색으로 활성화
    setSelectedDate(
      selectedDate.map((item) =>
        item.id == id ? { ...item, selected: true } : { ...item, selected: false },
      ),
    );

    // 3. 이 상태들은 자식 컴포넌트가 style_time을 만들기 위해 필요!
    setYear(year);
    setMonth(month);
    setDate(date);
    setDay(day);

    // 4. 클릭이 없을때 아무것도 띄우지 않기 위해 필요한 상태 설정
    setIsClicked(true);

    // 5. 오늘이면 오늘 지나간 시간을 빼야해서 필요한 상태 설정
    if (!index) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }

    // 6. Loading을 false로
    setLoading(false);
  };

  /* 오늘을 기준으로 2주 분의 일자를 렌더링하기 위한 작업 */
  // 1. 먼저 오늘 날짜를 불러옴
  const now = new Date();

  // 2. 오늘 날짜를 기준으로 2주 분의 타임 테이블을 생성
  //    DATE_SKELETON(14개짜리 빈 템플릿)을 기준으로 Map 돌며 생성
  const timeTable = DATE_SKELETON.map((item, index) => {
    // 오늘에 대한 정보를 저장
    const year = now.getFullYear();
    const month = now.getUTCMonth();
    const date = now.getDate();
    const day = now.getDay();

    // 날짜 +1 증가 setDate를 통해 년/월/일 증가 고려
    // --> JS 기본 Date를 쓰지 않아도 됨!(moment 등으로 대체 가능)
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
                ? { ...styles.dateTag, backgroundColor: '#0A0A32' }
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
          navigation={navigation}
          setStyleTime={setStyleTime}
          scheduleList={scheduleList}
          isClicked={isClicked}
          isToday={isToday}
          year={year}
          month={month}
          date={date}
          day={day}
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
