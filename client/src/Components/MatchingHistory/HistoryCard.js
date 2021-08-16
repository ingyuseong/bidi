import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { dateFormating, textLimiting } from '../../Lib/utils';
import Modal from 'react-native-modal';
import ProposalModal from '../Modal/proposalModal';
import BidModal from '../Modal/bidModal';

function HistoryCard({ history }) {
  const [historyItem, setHistoryItem] = useState({});
  const [stars, setStars] = useState(0);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const [isProposal, setIsProposal] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const updateStarsHandler = async (value) => {
    await setStars(value);
    await updateStar(value);
  };
  const updateStar = async (value) => {
    await fetch('http://127.0.0.1:3000' + `/api/matchingHistory/star/${history.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        star: value,
      }),
    })
      .then((response) => response.json())
      .then((res) => {})
      .catch((error) => {
        console.error(error);
      });
  };
  const updateReview = async () => {
    await fetch('http://127.0.0.1:3000' + `/api/matchingHistory/review/${history.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        review: reviewText,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        await setHistoryItem({
          ...historyItem,
          review: reviewText,
        });
        setReviewToggle(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const proposalModalOpen = () => {
    setIsProposal(true);
    setModalVisible(true);
  };
  const bidModalOpen = () => {
    setIsProposal(false);
    setModalVisible(true);
  };
  useEffect(() => {
    setHistoryItem(history);
  }, []);
  return (
    <View style={styles.historyContainer}>
      <View style={styles.designerBox}>
        <Image style={styles.designerImg} source={{ uri: history.designer.img_src }} />
        <View style={styles.designerInfoBox}>
          <View style={styles.designerInfoLine}>
            <Text style={styles.designerName}>{history.designer.nick_name}</Text>
            <View style={{ alignItems: 'center', height: 20 }}>
              <Stars
                half={true}
                default={history.star}
                count={5}
                fullStar={<Icon name="star" style={[styles.myStarStyle]} size={20} />}
                emptyStar={
                  <Icon
                    name={'star'}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                    size={20}
                  />
                }
                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} size={20} />}
                update={(val) => updateStarsHandler(val)}
              />
            </View>
          </View>
          <View style={styles.designerInfoLine}>
            <Text style={styles.designerAddress}>@ 이너프헤어</Text>
            <Text style={styles.historyDate}>{dateFormating(history.created_at)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.tagBox}>
        <View style={styles.tag}>
          <Text style={{ fontSize: 14, color: '#8D8D8D' }}># {history.bid.large_category}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={{ fontSize: 14, color: '#8D8D8D' }}># {history.bid.small_category}</Text>
        </View>
      </View>
      {historyItem.review && historyItem.review.length > 0 ? (
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>{textLimiting(historyItem.review, 90)}</Text>
        </View>
      ) : (
        <View style={{ width: '100%' }}>
          {reviewToggle ? (
            <View style={styles.reviewWriteBox}>
              <TextInput
                value={reviewText}
                style={styles.reviewWriteArea}
                onChangeText={setReviewText}
                placeholder={'스타일링 서비스에 대한 리뷰를 남겨주세요! \n (최대 400자)'}
                multiline={true}
              />
              <View style={styles.reviewWriteBtnGroup}>
                <TouchableOpacity style={{ width: '31%' }} onPress={() => setReviewToggle(false)}>
                  <View style={styles.btnItem}>
                    <Text style={{ ...styles.btnText }}>취소</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '31%' }} onPress={() => updateReview()}>
                  <View style={styles.reviewWriteBtn}>
                    <Text style={{ ...styles.btnText, color: '#FF533A' }}>작성하기</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.btnGroupBox}>
              <TouchableOpacity style={{ width: '31%' }} onPress={() => setReviewToggle(true)}>
                <View
                  style={{
                    ...styles.btnItem,
                    borderColor: '#FF533A',
                    flexDirection: 'row',
                  }}>
                  <Icon name="pencil" size={20} color="#FF533A" />
                  <Text style={{ ...styles.btnText, color: '#FF533A', marginLeft: 5 }}>
                    리뷰쓰기
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '31%' }} onPress={() => proposalModalOpen()}>
                <View style={styles.btnItem}>
                  <Text style={styles.btnText}>제안서 보기</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '31%' }} onPress={() => bidModalOpen()}>
                <View style={styles.btnItem}>
                  <Text style={styles.btnText}>비드 보기</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        style={{
          alignItems: 'center',
        }}
        backdropOpacity={0.3}>
        {isProposal ? (
          <ProposalModal
            proposal={history.proposal}
            setModalVisible={setModalVisible}
            userInfo={history.customer}
          />
        ) : (
          <BidModal
            userInfo={history.designer}
            bid={history.bid}
            setModalVisible={setModalVisible}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    padding: 20,
  },

  // Designer Info Box
  designerBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  designerImg: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  designerName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  designerInfoBox: {
    width: '80%',
    marginLeft: 20,
  },
  designerInfoLine: {
    width: '100%',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  myStarStyle: {
    color: '#FF533A',
  },
  myEmptyStarStyle: {
    color: '#DBDBDB',
  },
  designerAddress: {
    marginRight: 10,
    fontWeight: '400',
  },
  historyDate: {
    color: '#878787',
    fontSize: 12,
  },

  // Tag Box
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 5,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#eeeeee',
    marginTop: 10,
    marginRight: 10,
    height: 23,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Review Box
  reviewBox: {
    padding: 10,
  },
  reviewText: {
    lineHeight: 20,
  },

  // Button Group Box
  btnGroupBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  btnItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#DBDBDB',
    height: 50,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8D8D8D',
  },
  // Review Write Box
  reviewWriteBox: {
    margin: 5,
    marginTop: 15,
  },
  reviewWriteArea: {
    width: '100%',
    height: 150,
    borderColor: 'rgb(214,214,214)',
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    paddingTop: 10,
    marginBottom: 10,
  },
  reviewWriteBtnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewWriteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#FF533A',
    height: 50,
  },
});

export default HistoryCard;
