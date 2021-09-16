import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Screen
import StyleModal from '../../../../Components/Modal/styleModal';

// Component
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

// API
import BrandingAPI from '../../../../Api/branding';

// Redux Action
import { deleteMatching } from '../../../../Contexts/Customer/Matching/action';

function StyleSelectScreen({ navigation, route }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const { setStyleMenu } = route.params;
  const [brandingStyles, setBrandingStyles] = useState();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);
  const modalOpen = (index) => {
    setModalVisible(true);
    setStyleIndex(index);
  };
  const submitStyle = async () => {
    if (selectedStyle) {
      await setStyleMenu(selectedStyle);
      navigation.navigate('Matching');
    } else {
      Alert.alert('스타일을 선택해 주세요!');
    }
  };
  useEffect(() => {
    async function FetchMode() {
      const branding = await BrandingAPI.getMainBrandingByDesignerId(matching[0].bid.designer_id);
      let brandingStyles = await branding[0].brandingStyles.filter(
        (style) => !matching[0].bid.bidStyles.some((bidStyle) => bidStyle.id == style.id),
      );
      brandingStyles = matching[0].bid.bidStyles.concat(brandingStyles);
      await setBrandingStyles(brandingStyles);
    }
    FetchMode();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.styleContainer}>
          {brandingStyles &&
            brandingStyles.length &&
            brandingStyles.map((style, index) => (
              <View style={styles.styleItem} key={index}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => modalOpen(index)}>
                  <Image
                    style={styles.styleImg}
                    source={{
                      uri: style.front_img_src,
                    }}
                  />
                  {selectedStyle && selectedStyle.id == style.id ? (
                    <TouchableOpacity
                      style={styles.checkedIconArea}
                      onPress={() => setSelectedStyle(null)}>
                      <AntDesign name="check" size={25} style={styles.checkIcon} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.checkIconArea}
                      onPress={() => setSelectedStyle(style)}>
                      <AntDesign name="check" size={25} style={styles.checkIcon} />
                    </TouchableOpacity>
                  )}
                  {matching[0].bid.bidStyles.some((bidStyle) => bidStyle.id == style.id) && (
                    <View style={styles.rankLabel}>
                      <Text style={styles.rankLabelText}>추천</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
      {brandingStyles && brandingStyles.length && (
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={modalVisible}
          style={{
            alignItems: 'center',
          }}
          backdropOpacity={0.3}>
          <StyleModal
            styleList={brandingStyles}
            index={styleIndex}
            setModalVisible={setModalVisible}
            navigation={navigation}
            deleteIcon={false}
          />
        </Modal>
      )}
      <TouchableOpacity style={styles.bottomBtnArea} onPress={submitStyle}>
        <Text style={styles.bottomBtnText}>선택하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  styleItem: {
    width: '50%',
    height: 200,
    padding: 2,
  },
  styleImg: {
    width: '100%',
    height: 196,
  },
  rankLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
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
  checkIconArea: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'gray',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIconArea: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#FF533A',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomBtnArea: {
    backgroundColor: '#FF533A',
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
  },
});

export default StyleSelectScreen;
