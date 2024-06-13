/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {savingData} from './src/services/notifications';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const notify = {
    title: remoteMessage?.notification?.title ?? '',
    message: remoteMessage?.notification?.body ?? '',
    image: remoteMessage?.notification?.image ?? '',
  };
  savingData(notify);
});

AppRegistry.registerComponent(appName, () => App);
