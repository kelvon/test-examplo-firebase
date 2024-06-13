/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Routes from './src/routes';
import {Alert, StatusBar} from 'react-native';
import {UserProvider} from './src/contexts/user.context';
import messaging from '@react-native-firebase/messaging';
import {savingData} from './src/services/notifications';

function App(): React.JSX.Element {
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      const notify = {
        title: remoteMessage?.notification?.title ?? '',
        message: remoteMessage?.notification?.body ?? '',
        image: remoteMessage?.notification?.image ?? '',
      };
      savingData(notify);
      Alert.alert(
        'Notificação recebida',
        'Atualize a lista de pelo botão ao lado do título "Notificações"',
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar backgroundColor="#FFCA28" barStyle="light-content" />
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
