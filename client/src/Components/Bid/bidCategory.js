import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function BidCategory({
  lengthTypeOpen,
  setLengthTypeOpen,
  lengthTypeValue,
  setLengthTypeValue,
  lengthTypeItems,
  setLengthTypeItems,
  styleTypeOpen,
  setStyleTypeOpen,
  styleTypeValue,
  setStyleTypeValue,
  styleTypeItems,
  setStyleTypeItems,
  isEdit,
}) {
  const onLengthTypeOpen = useCallback(() => {
    setStyleTypeOpen(false);
  }, []);

  const onStyleTypeOpen = useCallback(() => {
    setLengthTypeOpen(false);
  }, []);

  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>시술 정보</Text>
      </View>
      {isEdit ? (
        <>
          <DropDownPicker
            zIndex={1000}
            open={lengthTypeOpen}
            onOpen={onLengthTypeOpen}
            value={lengthTypeValue}
            items={lengthTypeItems}
            setOpen={setLengthTypeOpen}
            setValue={setLengthTypeValue}
            setItems={setLengthTypeItems}
            placeholder="대분류"
            style={{ ...styles.dropDownArea, height: 42, marginBottom: 16 }}
            dropDownContainerStyle={styles.dropDownArea}
            placeholderStyle={{ color: 'grey', fontSize: 15 }}
            listParentLabelStyle={{ color: 'grey', fontSize: 15 }}
            listMode="SCROLLVIEW"
          />
          {lengthTypeValue !== '미선택' && (
            <DropDownPicker
              zIndex={500}
              open={styleTypeOpen}
              onOpen={onStyleTypeOpen}
              value={styleTypeValue}
              items={styleTypeItems}
              setOpen={setStyleTypeOpen}
              setValue={setStyleTypeValue}
              setItems={setStyleTypeItems}
              placeholder="소분류"
              style={{ ...styles.dropDownArea, height: 42 }}
              dropDownContainerStyle={styles.dropDownArea}
              placeholderStyle={{ color: 'grey', fontSize: 15 }}
              listParentLabelStyle={{ color: 'grey', fontSize: 15, backgroundColor: 'white' }}
              listMode="SCROLLVIEW"
            />
          )}
        </>
      ) : (
        <View>
          <View style={styles.categoryArea}>
            <Text>{lengthTypeValue}</Text>
          </View>
          <View style={styles.categoryArea}>
            <Text>{styleTypeValue}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    margin: 16,
    marginTop: 0,
    marginBottom: 24,
    zIndex: 100,
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
  },
  dropDownArea: {
    flex: 1,
    borderColor: 'rgb(214,214,214)',
    borderRadius: 3,
    zIndex: 100,
  },
  categoryArea: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    padding: 12,
    marginBottom: 8,
  },
  categoryText: {
    color: '#111111',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
});

export default BidCategory;
