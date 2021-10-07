import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import DesignerReview from '../../../../Components/MatchingHistory/DesignerReview';
import NoHistoryScreen from './noHistoryScreen';
import Loading from '../../../../Components/Common/loading';

// Redux Action
import { getMatchingHistoryListByDesignerId } from '../../../../Contexts/Customer/MatchingHistory/action';

function DesignerHistory({ branding, isUser }) {
  const {
    data: matchingHistoryList,
    loading,
    error,
  } = useSelector((state) => state.customerMatchingHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchingHistoryListByDesignerId(branding.user_id));
  }, [dispatch]);
  if (loading || error || !matchingHistoryList) return <Loading />;
  return (
    <View>
      {matchingHistoryList && matchingHistoryList.length > 0 ? (
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <View style={styles.titleContainer}>
            <View style={styles.flex}>
              <Text style={styles.hasReview}>이 디자이너의 매칭내역</Text>
              <Text style={[styles.hasReview, styles.countReview]}>
                {matchingHistoryList.length > 9
                  ? matchingHistoryList.length
                  : '0' + matchingHistoryList.length}
              </Text>
            </View>
            <View style={styles.selectContainer}>
              <View style={styles.select}>
                <Text style={{ color: '#8D8D8D' }}>최신순</Text>
              </View>
              <View style={{ ...styles.select, borderLeftWidth: 0 }}>
                <Text style={{ color: '#8D8D8D' }}>평점순</Text>
              </View>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {matchingHistoryList.map((matching, index) => (
              <View key={index}>
                <DesignerReview matching={matching} type="customer" />
                <View style={{ marginBottom: 20 }}></View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <NoHistoryScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30,
  },
  flex: {
    flexDirection: 'row',
  },
  hasReview: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  countReview: {
    marginLeft: 10,
    color: '#FF3F00',
  },
  selectContainer: {
    flexDirection: 'row',
  },
  select: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    marginTop: 5,
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  reviewItem: {
    marginBottom: 40,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewImg: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  reviewName: {
    fontSize: 17,
    marginBottom: 10,
    marginRight: 20,
    fontWeight: 'bold',
  },
  reviewBox: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  reviewDate: {},
  reviewer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewGrade: {
    marginRight: 10,
  },
  reviewTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewTile: {
    marginTop: 15,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DesignerHistory;
