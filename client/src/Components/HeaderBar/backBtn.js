import React from 'react';
import { StyleSheet, Image } from 'react-native';

function BackBtn() {
  return (
    <Image
      source={require('../../../public/img/logo.png')}
      style={{ marginLeft: 10, width: 22, height: 22 }}
    />
  );
}

const styles = StyleSheet.create({});

export default BackBtn;
