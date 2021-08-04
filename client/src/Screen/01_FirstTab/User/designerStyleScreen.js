import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function DesignerStyleScreen({ info }) {
  console.log(info);
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.flex}>
          <Text style={styles.hasStyle}>이 디자이너의 스타일</Text>
          <Text style={[styles.hasStyle, styles.countStyle]}>{info.styles.length}</Text>
        </View>
        <View style={styles.genderContainer}>
          <View style={styles.gender}>
            <Text>남성</Text>
          </View>
          <View style={styles.gender}>
            <Text>여성</Text>
          </View>
        </View>
      </View>
      <View style={styles.styleContainer}>
        {info.styles.map((item, index) => (
          <View style={styles.styleItem} key={index}>
            <View>
              <Image
                style={styles.styleImg}
                source={{
                  uri: item.img_src_one,
                }}
              />
            </View>
            <View>
              <Text style={styles.styleTitle}>{item.title}</Text>
            </View>
            <View style={styles.styleDescription}>
              <Text>{item.subtitle}</Text>
            </View>
            <View>
              <Text style={styles.stylePrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
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
    borderColor: '#e2e2e2',
    padding: 10,
  },
  styleImg: {
    width: '100%',
    height: 150,
    resizeMode: 'center',
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleItem: {
    width: '45%',
    height: 300,
  },
  styleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  stylePrice: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default DesignerStyleScreen;
