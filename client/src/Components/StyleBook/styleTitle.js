import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function StyleTitle({
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    margin: 16,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
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
});
export default StyleTitle;
