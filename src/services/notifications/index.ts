import AsyncStorage from '@react-native-async-storage/async-storage';
import {Notifications} from './types/notifications';

const NOTIFICATIONS_KEY = 'notifications';

export const savingData = async (value: Notifications): Promise<void> => {
  try {
    const oldValueString: string | null =
      (await AsyncStorage.getItem(NOTIFICATIONS_KEY)) ?? null;
    var jsonValue: string | null = null;
    if (oldValueString !== null) {
      const oldValue = JSON.parse(oldValueString);
      jsonValue = JSON.stringify([...oldValue, value]);
    } else {
      jsonValue = JSON.stringify([value]);
    }
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, jsonValue);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

export const listingData = async (): Promise<Notifications[]> => {
  try {
    const listValueString: string | null =
      (await AsyncStorage.getItem(NOTIFICATIONS_KEY)) ?? null;
    if (listValueString !== null) {
      return JSON.parse(listValueString) as Notifications[];
    }
    return [] as Notifications[];
  } catch (e) {
    // saving error
    console.error(e);
    return [] as Notifications[];
  }
};
