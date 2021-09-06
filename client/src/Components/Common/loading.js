import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

function Loading({ loading }) {
  return <ActivityIndicator animating={loading} color="" size="large" style={styles.loader} />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },
});

export default Loading;
