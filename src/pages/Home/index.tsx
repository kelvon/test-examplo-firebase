import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Alert, Clipboard} from 'react-native';
import {signOut} from 'firebase/auth';
import {auth} from '../../services/firebaseConfig';
import {useUserContext} from '../../contexts/user.context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {listingData} from '../../services/notifications';
import {Notifications} from '../../services/notifications/types/notifications';
// import PushNotification from 'react-native-push-notification';

export default function Home() {
  const {user, setUser, setToken, token} = useUserContext();
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const nv = useNavigation<any>();

  const getFirstNameEmail = (email: string): string => {
    return email.split('@')[0];
  };

  const _handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      nv.navigate('Welcome');
    } catch (error) {
      console.error(error);
    }
  };

  const getListNotification = async () => {
    const lists = await listingData();
    setNotifications(lists);
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then((token: string) => setToken(token));
    messaging().onTokenRefresh((token: string) => setToken(token));
    getListNotification();
  }, []);

  return (
    <View className="d-flex flex-1 bg-[#fff]">
      <View className="d-flex bg-[#ffca28] h-75 rounded-b-3xl px-5">
        <Icon
          className="d-flex ml-5"
          onPress={() => {
            _handleLogout();
          }}
          name="arrow-left"
          size={30}
          color="#fff"
        />
        <Text className="text-[#fff] text-lg pt-7">{`Olá,`}</Text>
        <Text className="text-[#fff] text-4xl">{`${getFirstNameEmail(
          user?.email ?? '',
        )}`}</Text>
        <Text className="text-[#fff] text-sm pb-5">
          {`token: ${token} `}
          <Icon
            className="d-flex"
            onPress={() => {
              Clipboard.setString(token);
              Alert.alert('Copiado', 'Conteúdo copiado.');
            }}
            name="copy"
            size={14}
            color="#fff"
          />
        </Text>
      </View>
      <View className="d-flex mt-5">
        <View className="d-flex flex-row px-5 items-center">
          <Text className="text-[#000] text-bold text-2xl mr-2">
            Lista de Notificações
          </Text>
          <Icon
            className="d-flex"
            onPress={() => {
              getListNotification();
            }}
            name="rotate-right"
            size={18}
            color="#000"
          />
        </View>
        <FlatList
          data={notifications}
          renderItem={({item}) => (
            <View className="d-flex flex-column mt-5 px-5">
              <Text className="text-[#000] text-bold text-lg">
                {item.title}
              </Text>
              <Text className="text-[#a1a1a1] text-sm">{item.message}</Text>
            </View>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  );
}
