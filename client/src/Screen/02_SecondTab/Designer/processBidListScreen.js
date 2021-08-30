import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import ItemHeader from '../../../Components/ListItem/itemHeader';
import ItemContent from '../../../Components/ListItem/itemContent';
import ItemBottomBtn from '../../../Components/ListItem/itemBottomBtn';
import Line from '../../../Components/Common/line';

function ProcessBidListScreen({ navigation, matchingList }) {
  const cancelAlert = (id) => {
    Alert.alert('정말 취소하시겠습니까?', '취소후에는 변경이 불가능합니다', [
      { text: '취소', style: 'cancel' },
      {
        text: '취소하기',
        onPress: () => {
          statusSubmitHandler(id, 'cancel');
        },
      },
    ]);
  };
  const doneAlert = (bid) => {
    Alert.alert('시술이 완료되었습니까?', '완료후에는 변경이 불가능합니다', [
      { text: '취소', style: 'cancel' },
      {
        text: '완료하기',
        onPress: () => {
          matchingHistoryHandler(bid);
        },
      },
    ]);
  };
  const matchingHistoryHandler = async (bid) => {
    const { id, customer_id, designer_id, proposal_id } = bid;
    await fetch('http://127.0.0.1:3000' + `/api/matchingHistory/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        bid_id: id,
        customer_id: bid.user.id,
        designer_id: bid.designer_id,
        proposal_id: bid.proposal.id,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('Bid 상태가 성공적으로 수정되었습니다!');
          navigation.push('BidMain', { screen: 'ProcessBidList' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const statusSubmitHandler = async (id, status) => {
    await fetch('http://127.0.0.1:3000' + `/api/bid/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        status,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('Bid 상태가 성공적으로 수정되었습니다!');
          navigation.push('BidMain', { screen: 'ProcessBidList' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {matchingList.map((matching, index) => (
        <View style={styles.bidContainer} key={index}>
          <ItemHeader
            info={matching}
            screen="matching"
            clickHandler={() => {
              navigation.push('DetailBid', {
                info: {
                  ...matching,
                  length_type: matching.bid.length_type,
                  style_type: matching.bid.style_type,
                  need_care: matching.bid.need_care,
                  letter: matching.bid.letter,
                },
                screen: 'matching',
              });
            }}
          />
          <ItemContent navigation={navigation} info={matching} screen="matching" />
          <ItemBottomBtn
            info={matching}
            leftBtnText="취소됨"
            leftBtnHandler={() => cancelAlert(matching.id)}
            rightBtnText="시술 완료"
            rightBtnHandler={() => doneAlert(matching)}
          />
          <Line />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProcessBidListScreen;
