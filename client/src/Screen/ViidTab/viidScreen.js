// import React, { useState } from 'react';
// import { SafeAreaView, Button, Text, View, StyleSheet, Modal } from 'react-native';
// import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

// const designerList = [
//   {
//     name: '김동현',
//     age: 25,
//   },
//   {
//     name: '김장영',
//     age: 24,
//   },
//   {
//     name: '성인규',
//     age: 24,
//   },
//   {
//     name: '가난다',
//     age: 20,
//   },
// ];
// const Designer = ({ info }) => {
//   return (
//     <View>
//       <Text>디자이너 : {info.name}</Text>
//       <Text>나이 : {info.age}</Text>
//     </View>
//   );
// };

// function BiidScreen({ navigation }) {
//   const [now, setNow] = useState(0);
//   const [toggle, setToggle] = useState(false);
//   const [gestureName, setGestureName] = useState('none');
//   const [myText, setMyText] = useState("I'm ready to get swiped!");
//   const [backgroundColor, setBackgroundColor] = useState('#fff');
//   const config = {
//     velocityThreshold: 0.3,
//     directionalOffsetThreshold: 80,
//   };
//   const onSwipeUp = (gestureState) => {
//     setToggle(true);
//     setMyText('You swiped up!');
//   };

//   const onSwipeDown = (gestureState) => {
//     setToggle(false);
//     setMyText('You swiped Down!');
//   };

//   const onSwipeLeft = (gestureState) => {
//     const current = now;
//     setNow(current + 1);
//     setMyText('You swiped left!');
//   };

//   const onSwipeRight = (gestureState) => {
//     alert('Like it!');
//     setMyText('You swiped roght!');
//   };

//   const onSwipe = (gestureName, gestureState) => {
//     const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
//     setGestureName(gestureName);
//     switch (gestureName) {
//       case SWIPE_UP:
//         setBackgroundColor('red');
//         break;
//       case SWIPE_DOWN:
//         setBackgroundColor('green');
//         break;
//       case SWIPE_LEFT:
//         setBackgroundColor('blue');
//         break;
//       case SWIPE_RIGHT:
//         setBackgroundColor('yellow');
//         break;
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>비딩 관련 스크린</Text>
//       <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
//       {toggle ? (
//         <SafeAreaView>
//           <Text style={styles.text}>상세 정보</Text>
//         </SafeAreaView>
//       ) : (
//         <GestureRecognizer
//           onSwipe={(direction, state) => onSwipe(direction, state)}
//           onSwipeUp={(state) => onSwipeUp(state)}
//           onSwipeDown={(state) => onSwipeDown(state)}
//           onSwipeLeft={(state) => onSwipeLeft(state)}
//           onSwipeRight={(state) => onSwipeRight(state)}
//           config={config}
//           style={{
//             flex: 1,
//             width: '100%',
//             backgroundColor: backgroundColor,
//           }}>
//           <Designer info={designerList[now]} />
//         </GestureRecognizer>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {},
//   slide1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB',
//   },
//   slide2: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#97CAE5',
//   },
//   slide3: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#92BBD9',
//   },
//   text: {
//     color: 'blue',
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
// });
// export default BiidScreen;

import * as React from 'react';
import { Button, Text, View } from 'react-native';

function BiidScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>비딩 관련 스크린</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

export default BiidScreen;
