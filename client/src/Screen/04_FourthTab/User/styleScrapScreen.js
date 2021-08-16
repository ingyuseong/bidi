import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import StyleModal from '../../../Components/Modal/styleModal';

function StyleScrapIntroScreen({ navigation, styleScraps, userInfo }) {
  const [styleScrapList, setStyleScrapList] = useState(styleScraps);
  const [modalVisible, setModalVisible] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);
  const modalOpen = (index) => {
    setModalVisible(true);
    setStyleIndex(index);
  };
  useEffect(() => {
    const fetchMode = async () => {
      setStyleScrapList(
        styleScraps.map((style) => {
          return { ...style, isScraped: true };
        }),
      );
    };
    fetchMode();
  }, []);
  return (
    <ScrollView>
      <View style={styles.styleContainer}>
        {styleScraps.map((item, index) => (
          <View style={styles.styleItem} key={index}>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.imageAfter}
                onPress={() => modalOpen(index)}>
                <Image
                  style={styles.styleImg}
                  source={{
                    uri: item.img_src,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={modalVisible}
        style={{
          alignItems: 'center',
        }}
        backdropOpacity={0.3}>
        <StyleModal
          styleScraps={styleScrapList}
          index={styleIndex}
          setModalVisible={setModalVisible}
          setStyleScrapList={setStyleScrapList}
          userInfo={userInfo}
          navigation={navigation}
          deleteIcon={true}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,
  },
  styleItem: {
    width: '50%',
    height: 200,
    resizeMode: 'center',
    padding: 2,
  },
  styleImg: {
    width: '100%',
    height: 196,
  },
});

export default StyleScrapIntroScreen;
