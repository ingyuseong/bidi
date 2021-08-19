import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import CardListItem from './cardListItem';

function CardList({ navigation, items }) {

    return (
        <ScrollView style={{flexDirection: 'column', width: '100%', height: '63%', }}>
        {
          items.map((item, idx) => 
          (
            <CardListItem item={item} navigation={navigation} key={idx} />
          ))
        }
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  });

  export default CardList;