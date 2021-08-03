import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import UserInfo from '../../../Components/User/userInfo';
import BottomButton from '../../../Components/Common/bottomButton';

function MyProposalScreen({ proposal, userInfo }) {
  const [imageToggle, setImageToggle] = useState(false);
  const changeImage = () => {
    console.log(imageToggle);
    setImageToggle(!imageToggle);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {imageToggle ? (
          <Image
            style={styles.image}
            source={{
              uri: proposal.after_src,
            }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: proposal.before_src,
            }}
          />
        )}
        <TouchableOpacity
          style={
            imageToggle
              ? { ...styles.imageToggleButton, backgroundColor: '#0A0A32' }
              : styles.imageToggleButton
          }
          activeOpacity={0.8}
          onPress={() => setImageToggle(!imageToggle)}>
          <Text style={styles.imageToggleText}>{imageToggle ? 'After' : 'Before'}</Text>
        </TouchableOpacity>
      </View>
      <UserInfo info={userInfo} keywords={proposal.keywords} />
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{proposal.description}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>금액 범위 설정</Text>
      </View>
      <View style={styles.dropdownBox}>
        <TextInput
          style={styles.locationInput}
          underlineColorAndroid="transparent"
          editable={false}
          selectTextOnFocus={false}
          value={String(proposal.price_limit / 10000) + '만원 이내'}
        />
      </View>
      <View style={{ marginTop: 80 }}></View>
      <BottomButton
        leftName="삭제하기"
        rightName="수정하기"
        leftRatio={40}
        leftHandler={() => console.log('삭제하기')}
        rightHandler={() => console.log('수정하기')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: 'white',
  },
  content: {
    width: '100%',
    height: 375,
    borderWidth: 1,
    borderColor: 'rgb(243,243,243)',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageToggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 99,
    height: 37,
    right: 20,
    bottom: 15,
    backgroundColor: '#FF533A',
    borderRadius: 3,
  },
  imageToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  descriptionBox: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    width: '90%',
    padding: 5,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 21,
  },
  textBox: {
    width: '100%',
    margin: 25,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default MyProposalScreen;
