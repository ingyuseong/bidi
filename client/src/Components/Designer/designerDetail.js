import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import DesignerInfo from './designerInfo';
function DesignerDetail({ info }) {
  return (
    <ScrollView>
      <DesignerInfo info={info} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default DesignerDetail;
