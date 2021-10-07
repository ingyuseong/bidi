import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function BidLetter({ bidLetter, setBidLetter, isEdit }) {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>비드 레터</Text>
      </View>
      {isEdit ? (
        <View style={styles.bidLetterBox}>
          <TextInput
            style={styles.bidLetterArea}
            value={bidLetter}
            onChangeText={(text) => setBidLetter(text)}
            placeholder="고객님께서 코멘트를 남겨주세요. 정성스러운 비드를 남겨주실 수록 더 많은 선택을 받으실 수 있습니다! (최대 400자)"
            autoCapitalize="sentences"
            autoCorrect
            maxLength={400}
            multiline={true}
            returnKeyType="next"
          />
          <View style={styles.lengthArea}>
            <Text style={[styles.lengthText, bidLetter.length === 400 && styles.maxLengthText]}>
              ( {bidLetter.length} / 400 )
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ ...styles.bidLetterArea, backgroundColor: '#F5F5F5', borderWidth: 0 }}>
          <Text style={styles.bidLetterText}>{bidLetter}</Text>
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
  bidLetterArea: {
    height: 167,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  bidLetterText: {
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

export default BidLetter;
