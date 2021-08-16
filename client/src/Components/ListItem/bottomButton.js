import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

function BottomButton({ navigation, info, leftBtnText, rightBtnText, screen }) {
  const status = info.status ? info.status : 'default';
  const btnDisable = status === 'cancel' || status == 'done' ? true : false;

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
  const moveToDetailBranding = (info) => {
    navigation.navigate('DetailBranding', { info });
  };
  const registerAlert = (id) => {
    Alert.alert('대표 포트폴리오로 등록하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      {
        text: '등록하기',
        onPress: () => {
          registerSubmitHandler(id);
        },
      },
    ]);
  };
  const registerSubmitHandler = async (id) => {
    await fetch('http://127.0.0.1:3000' + `/api/branding/main`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: id,
        user_id: info.user_id,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('대표 포트폴리오 설정되었습니다!');
          navigation.push('BrandingMain');
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
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btnBox, status === 'cancel' && styles.active]}
        onPress={() => cancelAlert(info.id)}
        disabled={btnDisable}>
        <Text style={[styles.btnText, status === 'cancel' && styles.active]}>{leftBtnText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnBox, status === 'done' ? styles.active : styles.defaultBorder]}
        onPress={() => doneAlert(info)}
        disabled={btnDisable}>
        <Text style={[styles.btnText, status === 'done' ? styles.active : styles.defaultText]}>
          {rightBtnText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    justifyContent: 'space-between',
  },
  btnBox: {
    width: '49%',
    height: 36,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#8D8D8D',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: -0.5,
  },
  active: {
    backgroundColor: '#0A0A32',
    borderColor: '#0A0A32',
    color: '#FFFFFF',
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: '#0A0A32',
    borderRadius: 2,
  },
  defaultText: {
    color: '#0A0A32',
  },
});

export default BottomButton;

//   /* {status !== 'wait' && (
//         <View style={styles.processBox}>
//           <TouchableOpacity
//             style={[styles.processArea, status === 'cancel' && styles.cancelBtn]}
//             onPress={() => {
//               cancelAlert(info.id);
//             }}>
//             <Text style={[styles.processAreaText, status === 'cancel' && styles.cancelBtn]}>
//               취소됨
//             </Text>
//           </TouchableOpacity>
//           {status === 'cancel' && (
//             <TouchableOpacity style={[styles.processArea]}>
//               <Text style={styles.processAreaText}>시술 완료</Text>
//             </TouchableOpacity>
//           )}
//           {status === 'process' && (
//             <TouchableOpacity
//               style={[styles.processArea, styles.processBtn]}
//               onPress={() => doneAlert(info.id)}>
//               <Text>시술 진행중</Text>
//             </TouchableOpacity>
//           )}
//           {status === 'done' && (
//             <TouchableOpacity style={[styles.processArea, styles.doneBtn]}>
//               <Text style={styles.doneBtn}>시술 완료</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       )} */
