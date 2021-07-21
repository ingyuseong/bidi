import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';

function MainScreen({}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

export default MainScreen;
