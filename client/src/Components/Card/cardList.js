import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import CardListItem from './cardListItem';

function CardList({ items }) {
    return (
        <ScrollView style={{flexDirection: 'column', width: '100%', height: '63%', }}>
            {/* {console.log(items)} */}
        {
          items.map((item, idx) => 
          (
            <CardListItem item={item} key={idx} />
          ))
        }
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  });

  export default CardList;