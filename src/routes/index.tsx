import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import {useUserContext} from '../contexts/user.context';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const {user} = useUserContext();
  if (user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
