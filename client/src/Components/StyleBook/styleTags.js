import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function StyleTags({
  title,
  subTitle,
  placeholderMessage,
  placeholderColor,
  height,
  multiline = false,
  returnKeyType = 'search',
  value,
  setValue,
  styleTags = [],
  addStyleTags,
  deleteStyleTags,
}) {
  return (
    <View style={styles.inputBox}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>{title}</Text>
        {subTitle && <Text style={styles.subtitleText}>{subTitle}</Text>}
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
        multiline={multiline}
        blurOnSubmit={true}
        returnKeyType={returnKeyType}
        onSubmitEditing={addStyleTags}
      />
      {styleTags.length > 0 && (
        <View style={styles.styleTagBox}>
          {styleTags.map((tag, index) => (
            <View key={index} style={styles.styleTagArea}>
              <Text style={styles.styleTagText}># {tag}</Text>
              <TouchableOpacity style={styles.deleteIconArea} onPress={() => deleteStyleTags(tag)}>
                <Icon name="close" size={13} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    margin: 16,
    marginBottom: 32,
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
  subtitleText: {
    fontSize: 14,
    lineHeight: 17,
    marginLeft: 5,
    color: '#111111',
  },
  titleTextArea: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleTagBox: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  styleTagArea: {
    height: 35,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  styleTagText: {
    color: '#8D8D8D',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.5,
    fontWeight: '500',
  },
  deleteIconArea: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: '#8D8D8D',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: -5,
    top: -5,
  },
  deleteIcon: {
    color: 'white',
  },
});

export default StyleTags;
