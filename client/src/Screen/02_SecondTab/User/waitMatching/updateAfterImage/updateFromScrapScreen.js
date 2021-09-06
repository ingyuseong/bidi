import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native';

// Screens
import StyleScrapIntroScreen from '../../../../04_FourthTab/User/introStyleScrapScreen';

// Components
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../../../../Components/Common/loading';

// Redux Action
import { getStyleScrapList } from '../../../../../Contexts/StyleScrap/action';

function UpdateFromScrapScreen({ navigation, route }) {
  // states
  const { setAfterImageStyle } = route.params;
  const { data: user } = useSelector((state) => state.user);
  const { data: styleScrapList, loading, error } = useSelector((state) => state.styleScrap);

  // functions
  const goBack = async (e) => {
    navigation.goBack();
  };
  const submit = async (img_src) => {
    setAfterImageStyle(img_src);
    navigation.navigate('UpdateProposal');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStyleScrapList(user.id));
  }, [dispatch]);
  if (loading || error) return <Loading loading />;
  if (!styleScrapList) return <StyleScrapIntroScreen />;

  return (
    <View style={styles.container}>
      <View style={styles.selectBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
          <Ionicons name="close-outline" size={40} />
        </TouchableOpacity>
        <Text style={styles.header}>STYLE BOOK</Text>
      </View>
      <ScrollView>
        <View style={styles.styleContainer}>
          {styleScrapList && styleScrapList.length > 0 ? (
            styleScrapList.map((item, index) => (
              <View style={styles.styleItem} key={index}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.imageAfter}
                    onPress={() => submit(item.img_src_array[0])}>
                    <Image
                      style={styles.styleImg}
                      source={{
                        uri: item.img_src_array[0],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <StyleScrapIntroScreen />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
    marginTop: 10,
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
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

export default UpdateFromScrapScreen;
