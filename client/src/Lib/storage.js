import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      console.log('json: ', jsonValue);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('setItem error > ', e);
    }
  }
  async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : '';
    } catch (e) {
      console.error('getItem error > ', e);
    }
  }
  async changeData(key, value) {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('merge error > ', e);
    }
  }
  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('remove error > ', e);
    }
  }
  async clearData() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('clear error > ', e);
    }
  }
}

const BidiStorage = new Storage();
export default BidiStorage;
