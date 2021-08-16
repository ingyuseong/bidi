import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { dateFormating, textLimiting } from '../../Lib/utils';
import Modal from 'react-native-modal';
import ProposalModal from '../Modal/proposalModal';

function HistoryCard({ history }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
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
  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyItem}>
        <View style={styles.DesingerBox}>
          <Image style={styles.DesignerImg} source={{ uri: history.user.img_src }} />
          <View style={styles.DesignerInfo}>
            <View style={styles.Designer}>
              <Text style={styles.DesignerName}>{history.user.nick_name}</Text>
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
            <View style={styles.Designer}>
              <Text style={styles.historyAddress}>@ 이너프헤어</Text>
              <Text style={styles.historyDate}>{dateFormating(history.created_at)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.historyTag}>
          <View style={styles.tag}>
            <Text style={{ fontSize: 14, color: '#8D8D8D' }}># {history.bid.large_category}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ fontSize: 14, color: '#8D8D8D' }}># {history.bid.small_category}</Text>
          </View>
        </View>
        {history.review && history.review.length > 0 ? (
          <View style={styles.ReviewArea}>
            <Text style={styles.ReviewText}>{textLimiting(history.review, 90)}</Text>
          </View>
        ) : (
          <View style={{ width: '100%' }}>
            <View style={styles.bidProposalBtnArea}>
              <TouchableOpacity style={{ width: '31%' }}>
                <View
                  style={{
                    ...styles.bidProposalBtn,
                    borderColor: '#FF533A',
                    flexDirection: 'row',
                  }}>
                  <Icon name="pencil" size={20} color="#FF533A" />
                  <Text style={{ ...styles.moreBtnText, color: '#FF533A', marginLeft: 5 }}>
                    리뷰쓰기
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '31%' }} onPress={() => setModalVisible(true)}>
                <View style={styles.bidProposalBtn}>
                  <Text style={styles.moreBtnText}>제안서 보기</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '31%' }}>
                <View style={styles.bidProposalBtn}>
                  <Text style={styles.moreBtnText}>비드 보기</Text>
                </View>
              </TouchableOpacity>
            </View>
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
        <ProposalModal
          proposal={history.proposal}
          setModalVisible={setModalVisible}
          userInfo={history.user}
          deleteIcon={false}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    padding: 20,
  },
  DesingerBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  DesignerImg: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  DesignerName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  DesignerInfo: {
    width: '80%',
    marginLeft: 20,
  },
  Designer: {
    width: '100%',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  historyAddress: {
    marginRight: 10,
    fontWeight: '400',
  },
  historyDate: {
    color: '#878787',
    fontSize: 12,
  },
  historyTag: {
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
  bold: {
    fontWeight: 'bold',
  },
  myStarStyle: {
    color: '#FF533A',
  },
  myEmptyStarStyle: {
    color: '#DBDBDB',
  },
  moreBtnArea: {
    alignItems: 'center',
  },
  moreBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 3,
    borderColor: '#DBDBDB',
    height: 50,
  },
  moreBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8D8D8D',
  },
  bidProposalBtnArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  bidProposalBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#DBDBDB',
    height: 50,
  },
  ReviewArea: {
    padding: 10,
  },
  ReviewText: {
    lineHeight: 20,
  },
});

export default HistoryCard;
