import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function StyleDescription({ styleDescription, setStyleDescription, isEdit }) {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>상세 설명</Text>
      </View>
      {isEdit ? (
        <View style={styles.styleLetterBox}>
          <TextInput
            style={styles.styleLetterArea}
            value={styleDescription}
            onChangeText={(text) => setStyleDescription(text)}
            placeholder="스타일에 대한 상세 설명을 입력해주세요! (최대 400자)"
            autoCapitalize="sentences"
            autoCorrect
            maxLength={400}
            multiline={true}
            returnKeyType="next"
          />
          <View style={styles.lengthArea}>
            <Text
              style={[styles.lengthText, styleDescription.length === 400 && styles.maxLengthText]}>
              ( {styleDescription.length} / 400 )
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ ...styles.styleLetterArea, backgroundColor: '#F5F5F5', borderWidth: 0 }}>
          <Text style={styles.styleLetterText}>{styleDescription}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    margin: 16,
    marginTop: 0,
    marginBottom: 24,
    zIndex: 0,
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  titleTextArea: {
    marginBottom: 16,
  },
  styleLetterArea: {
    height: 167,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  styleLetterText: {
    color: '#111111',
    lineHeight: 21,
    fontSize: 13,
    fontWeight: '400',
  },
  lengthArea: {
    marginTop: 8,
  },
  lengthText: {
    textAlign: 'right',
    color: 'gray',
    fontSize: 15,
  },
  maxLengthText: {
    color: 'red',
  },
});

export default StyleDescription;
