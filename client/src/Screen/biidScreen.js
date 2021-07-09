import * as React from 'react';
import { Button, Text, View } from 'react-native';

function BiidScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>비딩 관련 스크린</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

export default BiidScreen;
