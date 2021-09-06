import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function StylePrice({
  title,
  placeholderMessage,
  placeholderColor,
  height,
  returnKeyType = 'search',
  value,
  setValue,
}) {
  return (
    <View style={styles.inputBox}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={{ ...styles.inputArea, height }}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholder={placeholderMessage}
          placeholderTextColor={placeholderColor}
          autoCapitalize="sentences"
          autoCorrect
          maxLength={20}
          multiline={false}
          blurOnSubmit={true}
          returnKeyType={returnKeyType}
          keyboardType="numeric"
        />
        <View style={styles.wonArea}>
          <Text style={styles.wonText}>원</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    margin: 16,
    marginTop: 0,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderRightWidth: 0,
    width: '90%',
  },
  inputWrapper: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  wonArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    borderLeftWidth: 0,
  },
  wonText: {
    color: '#A5A5A5',
  },
});
export default StylePrice;
