import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Text, TouchableOpacity, View, StyleSheet, ScrollView, Image } from 'react-native';

// Screens
import StyleScrapIntroScreen from './introStyleScrapScreen';

// Components
import Modal from 'react-native-modal';
import StyleModal from '../../../Components/Modal/styleModal';
import Loading from '../../../Components/Common/loading';

// Redux Action
import { getStyleScrapList } from '../../../Contexts/StyleScrap/action';

function StyleScrapScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: styleScrapList, loading, error } = useSelector((state) => state.styleScrap);
  const [modalVisible, setModalVisible] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);

  const dispatch = useDispatch();
  const modalOpen = (index) => {
    setModalVisible(true);
    setStyleIndex(index);
  };

  useEffect(() => {
    dispatch(getStyleScrapList(user.id));
  }, [dispatch]);
  if (loading || error) return <Loading loading />;
  if (!styleScrapList) return <StyleScrapIntroScreen />;
  return (
    <>
      {styleScrapList && styleScrapList.length > 0 ? (
        <ScrollView>
          <View style={styles.styleContainer}>
            {styleScrapList.map((item, index) => (
              <View style={styles.styleItem} key={index}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.imageAfter}
                    onPress={() => modalOpen(index)}>
                    <Image
                      style={styles.styleImg}
                      source={{
                        uri: item.img_src_array[0],
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
              styleList={styleScrapList}
              index={styleIndex}
              setModalVisible={setModalVisible}
              navigation={navigation}
              deleteIcon={true}
            />
          </Modal>
        </ScrollView>
      ) : (
        <StyleScrapIntroScreen />
      )}
    </>
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

export default StyleScrapScreen;
