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

// Screen
import IntroProposalScreen from '../staticScreen/introProposalScreen';

// Components
import ProposalUserInfo from '../../../../../Components/Proposal/proposalUserInfo';
import BottomButton from '../../../../../Components/Common/bottomButton';
import Loading from '../../../../../Components/Common/loading';

// API
import ProposalAPI from '../../../../../Api/proposal';

// Redux Action
import { getProposalAsync, deleteProposal } from '../../../../../Contexts/Customer/Proposal/action';

function MyProposalScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: proposal, loading, error } = useSelector((state) => state.customerProposal);
  const [imageToggle, setImageToggle] = useState(false);
  const dispatch = useDispatch();
  const removeProposal = async () => {
    const response = await ProposalAPI.deleteProposal(proposal[0].id);
    if (response) {
      dispatch(deleteProposal(proposal[0].id));
      Alert.alert('삭제 되었습니다!');
      navigation.replace('Wait');
    } else {
      Alert.alert('삭제에 실패했습니다');
    }
  };
  const deleteAlert = () => {
    Alert.alert('정말 삭제하시겠습니까?', '제안서 등록에는 제한이 있습니다', [
      { text: '취소', style: 'cancel' },
      { text: '삭제하기', onPress: removeProposal },
    ]);
  };
  const updateProposal = () => {
    navigation.push('UpdateProposal');
  };
  useEffect(() => {
    dispatch(getProposalAsync(user.id));
  }, [dispatch]);
  if (loading || error || !proposal) return <Loading />;
  return (
    <>
      {proposal.length > 0 ? (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.content}>
              {imageToggle ? (
                <Image
                  style={styles.image}
                  source={{
                    uri: proposal[0].after_src,
                  }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={{
                    uri: proposal[0].before_src,
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
            <ProposalUserInfo proposal={proposal[0]} />
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>
                {proposal[0].description != '' ? proposal[0].description : '요구사항 없음'}
              </Text>
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
                value={String(proposal[0].price_limit / 10000) + '만원 이내'}
              />
            </View>
            <View style={{ marginTop: 80 }}></View>
          </ScrollView>
          <BottomButton
            leftName="삭제하기"
            rightName="수정하기"
            leftRatio={40}
            leftHandler={deleteAlert}
            rightHandler={updateProposal}
          />
        </View>
      ) : (
        <IntroProposalScreen navigation={navigation} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageCover: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  imageCoverText: { color: 'white', fontSize: 30, fontWeight: '500', opacity: 1 },
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
