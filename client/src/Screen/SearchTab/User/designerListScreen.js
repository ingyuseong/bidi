import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import DesignerStyle from '../../../Components/Designer/designerStyle';
import DesignerInfo from '../../../Components/Designer/designerInfo';
import Swiper from 'react-native-swiper';
import GestureRecognizer from 'react-native-swipe-gestures';

const infoLists = [
  {
    name: '김동현',
    shopName: '이너프헤어',
    shopDistance: '1km',
    tags: ['칼단발', '뱅헤어', '극손상 헤어'],
    details: '세련되고 섬세한 스타일로 고객님의 니즈를 확실히 파악하여 진단해드리겠습니다.',
  },
  {
    name: '김장영',
    shopName: '고대헤어',
    shopDistance: '2km',
    tags: ['남자머리', '처피뱅', '탈색모'],
    details: '스타일로 고객님의 니즈를 확실히 파악하여 진단해드리겠습니다.',
  },
  {
    name: '성인규',
    shopName: '바버샵',
    shopDistance: '3km',
    tags: ['신입'],
    details: '잘부탁드립니다.',
  },
];
function DesignerListScreen({ navigation }) {
  const [toggle, setToggle] = useState(false);
  const onSwipeUp = (gestureState) => {
    setToggle(true);
  };

  const onSwipeDown = (gestureState) => {
    setToggle(false);
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    // <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}>
    //   {infoLists.map((info, index) => (
    //     <GestureRecognizer
    //       onSwipeUp={(state) => onSwipeUp(state)}
    //       onSwipeDown={(state) => onSwipeDown(state)}
    //       config={config}
    //       key={index}
    //       style={{
    //         flex: 1,
    //         width: '100%',
    //       }}>
    //       {toggle ? (
    //         <SafeAreaView>
    //           <Text>Details</Text>
    //         </SafeAreaView>
    //       ) : (
    //         <View style={styles.container}>
    //           <DesignerStyle info={info} />
    //           <DesignerInfo info={info} />
    //         </View>
    //       )}
    //     </GestureRecognizer>
    //   ))}
    // </Swiper>
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {infoLists.map((info, index) => (
        <Swiper
          key={index}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          loop={false}
          horizontal={false}>
          <View style={styles.container}>
            <DesignerStyle info={info} />
            <DesignerInfo info={info} />
          </View>
          <View>
            <Text>Details {index} </Text>
          </View>
        </Swiper>
      ))}
    </Swiper>
  );
}
const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  styleContainer: {
    flex: 1.5,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
});

export default DesignerListScreen;
