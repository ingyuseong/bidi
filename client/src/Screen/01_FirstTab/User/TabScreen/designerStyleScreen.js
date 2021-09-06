import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { priceFormating, textLimiting } from '../../../../Lib/utils';

// Components
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import StyleModal from '../../../../Components/Modal/styleModal';
import Loading from '../../../../Components/Common/loading';

// Redux Action
import {
  registerStyleScrap,
  deleteStyleScrap,
  getStyleScrapList,
} from '../../../../Contexts/StyleScrap/action';

// API
import StyleScrapAPI from '../../../../Api/styleScrap';

function DesignerStyleScreen({ navigation, branding }) {
  // state
  const { data: user } = useSelector((state) => state.user);
  const { data: styleScrapList, loading, error } = useSelector((state) => state.styleScrap);
  const [moreToggle, setMoreToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);
  // functions
  const dispatch = useDispatch();
  const registerScrap = async (style) => {
    await StyleScrapAPI.registerStyleScrap({
      user_id: user.id,
      style_id: style.id,
    });
    dispatch(registerStyleScrap(style));
  };
  const deleteScrap = async (style) => {
    await StyleScrapAPI.deleteStyleScrap({
      user_id: user.id,
      style_id: style.id,
    });
    dispatch(deleteStyleScrap(style.id));
  };
  const modalOpen = (index) => {
    setModalVisible(true);
    setStyleIndex(index);
  };
  useEffect(() => {
    dispatch(getStyleScrapList(user.id));
  }, [dispatch]);
  if (loading || error || !styleScrapList) return <Loading />;
  return (
    <View style={{ marginLeft: 20, marginRight: 20 }}>
      <View style={styles.titleContainer}>
        <View style={styles.flex}>
          <Text style={styles.hasStyle}>이 디자이너의 스타일</Text>
          <Text style={[styles.hasStyle, styles.countStyle]}>{branding.brandingStyles.length}</Text>
        </View>
        <View style={styles.genderContainer}>
          <View style={styles.gender}>
            <Text style={{ color: '#8D8D8D' }}>여성</Text>
          </View>
          <View style={{ ...styles.gender, borderLeftWidth: 0 }}>
            <Text style={{ color: '#8D8D8D' }}>남성</Text>
          </View>
        </View>
      </View>
      <View style={styles.styleContainer}>
        {branding.brandingStyles.map((style, index) => (
          <View style={{ width: '48%' }} key={index}>
            {moreToggle || index < 4 ? (
              <View style={{ width: '100%', height: 300 }}>
                <View style={{ width: '100%' }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => modalOpen(index)}>
                    <Image
                      style={styles.styleImg}
                      source={{
                        uri: style.img_src_array[0],
                      }}
                    />
                  </TouchableOpacity>
                  <View style={styles.styleScrapIcon}>
                    {styleScrapList.some((scrap) => scrap.id == style.id) ? (
                      <TouchableOpacity activeOpacity={0.8} onPress={() => deleteScrap(style)}>
                        <Icon name="heart" color="#FF533A" size={20} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => registerScrap(style)}>
                        <Icon name="heart-o" color="white" size={20} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {index < 3 ? (
                    <View style={styles.rankLabel}>
                      <Text style={styles.rankLabelText}>{index + 1}위</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => modalOpen(index)}>
                  <View>
                    <Text style={styles.styleTitle}>{style.title}</Text>
                  </View>
                  <View style={styles.styleDescription}>
                    <Text style={styles.styleDescriptionText}>
                      {textLimiting(style.description, 100)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.stylePrice}>{priceFormating(style.price)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        ))}
      </View>
      {moreToggle ? (
        <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
          <View style={styles.moreBtn}>
            <Text style={styles.moreBtnText}>대표 스타일만 보기</Text>
          </View>
        </TouchableOpacity>
      ) : branding.brandingStyles.length > 4 ? (
        <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
          <View style={styles.moreBtn}>
            <Text style={styles.moreBtnText}>스타일 더보기</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        style={{
          alignItems: 'center',
        }}
        backdropOpacity={0.3}>
        <StyleModal
          styleList={branding.brandingStyles}
          index={styleIndex}
          setModalVisible={setModalVisible}
          navigation={navigation}
          deleteIcon={false}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30,
  },
  flex: {
    flexDirection: 'row',
  },
  hasStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  countStyle: {
    marginLeft: 10,
    color: '#FF3F00',
  },
  genderContainer: {
    flexDirection: 'row',
  },
  gender: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    marginTop: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleItem: {
    width: '48%',
    height: 300,
  },
  styleImg: {
    width: '100%',
    height: 170,
  },
  styleScrapIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  styleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  styleDescription: {
    height: 40,
    overflow: 'hidden',
  },
  stylePrice: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rankLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankLabelText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  moreBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    width: '95%',
    height: 40,
    marginBottom: 40,
  },
  moreBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8D8D8D',
  },
});

export default DesignerStyleScreen;
