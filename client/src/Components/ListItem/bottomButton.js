import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

function BottomButton({
  leftBtnHandler,
  leftBtnText,
  btnDisable,
  rightBtnHandler,
  rightBtnText,
  status,
}) {
  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={[styles.btnBox, status === 'cancel' && styles.active]}
        onPress={leftBtnHandler}
        disabled={btnDisable}>
        <Text style={[styles.btnText, status === 'cancel' && styles.active]}>{leftBtnText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnBox, status === 'done' ? styles.active : styles.defaultBorder]}
        onPress={rightBtnHandler}
        disabled={btnDisable}>
        <Text style={[styles.btnText, status === 'done' ? styles.active : styles.defaultText]}>
          {rightBtnText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
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
