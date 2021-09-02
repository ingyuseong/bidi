import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { dateFormating, textLimiting } from '../../Lib/utils';

// Components
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import ProposalModal from '../Modal/proposalModal';
import BidModal from '../Modal/bidModal';

// API
import MatchingAPI from '../../Api/matching';

// Redux Action
import { getMatchingHistoryListByCustomerId, patchMatching } from '../../Contexts/Matching/action';

function MatchingHistoryCard({ index, type }) {
  const { data: matchingHistoryList, loading, error } = useSelector((state) => state.matching);
  const [stars, setStars] = useState(0);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [reviewText, setReviewText] = useState(matchingHistoryList[index].review);

  const [isProposal, setIsProposal] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const updateStar = async (value) => {
    await setStars(value);
    await MatchingAPI.patchMatchingStar(matchingHistoryList[index].id, { star: value });
    dispatch(patchMatching(matchingHistoryList[index].id, { star: value }));
  };
  const updateReview = async () => {
    await MatchingAPI.patchMatchingReview(matchingHistoryList[index].id, { review: reviewText });
    dispatch(patchMatching(matchingHistoryList[index].id, { review: reviewText }));
    setReviewToggle(false);
  };
  const proposalModalOpen = () => {
    setIsProposal(true);
    setModalVisible(true);
  };
  const bidModalOpen = () => {
    setIsProposal(false);
    setModalVisible(true);
  };
  useEffect(() => {}, [dispatch]);
  return (
    <View style={styles.historyContainer}>
      <View style={styles.designerBox}>
        <Image
          style={styles.designerImg}
          source={
            type == 'customer'
              ? { uri: matchingHistoryList[index].proposal.user.img_src }
              : { uri: matchingHistoryList[index].bid.user.img_src }
          }
        />
        <View style={styles.designerInfoBox}>
          <View style={styles.designerInfoLine}>
            <Text style={styles.designerName}>
              {type == 'customer'
                ? matchingHistoryList[index].proposal.user.nick_name
                : matchingHistoryList[index].bid.user.nick_name}
            </Text>
            <View style={{ alignItems: 'center', height: 20 }}>
              <Stars
                half={true}
                default={matchingHistoryList[index].star}
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
                update={(val) => updateStar(val)}
              />
            </View>
          </View>
          <View style={styles.designerInfoLine}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Icon name="map-marker" size={18} color="grey" />
              <Text style={styles.designerAddress}>asdf</Text>
            </View>
            <Text style={styles.historyDate}>
              {dateFormating(matchingHistoryList[index].created_at)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.tagBox}>
        <View style={styles.tag}>
          <Text style={{ fontSize: 14, color: '#8D8D8D' }}>
            # {matchingHistoryList[index].bid.style_type}
          </Text>
        </View>
        <View style={styles.tag}>
          <Text style={{ fontSize: 14, color: '#8D8D8D' }}>
            # {matchingHistoryList[index].bid.length_type}
          </Text>
        </View>
      </View>
      {!reviewToggle ? (
        reviewText ? (
          <View style={styles.reviewBox}>
            <Text style={styles.reviewText}>{textLimiting(reviewText, 90)}</Text>
          </View>
        ) : (
          <View style={styles.reviewBox}>
            <Text style={{ ...styles.reviewText, color: '#8D8D8D' }}>
              리뷰가 작성되지 않았습니다
            </Text>
          </View>
        )
      ) : (
        <></>
      )}
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
                  <Text style={{ ...styles.btnText, color: '#FF533A' }}>
                    {matchingHistoryList[index].review ? '수정하기' : '작성하기'}
                  </Text>
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
                  {reviewText ? '리뷰수정' : '리뷰작성'}
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
            proposal={matchingHistoryList[index].proposal}
            setModalVisible={setModalVisible}
            userInfo={matchingHistoryList[index].proposal}
          />
        ) : (
          <BidModal
            userInfo={matchingHistoryList[index].designer}
            bid={matchingHistoryList[index].bid}
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
    marginTop: 10,
    padding: 10,
  },
  reviewText: {
    lineHeight: 20,
  },

  // Button Group Box
  btnGroupBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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

export default MatchingHistoryCard;
