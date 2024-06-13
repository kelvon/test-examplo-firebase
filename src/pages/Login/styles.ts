import styled from 'styled-components/native';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #ffca28;
`;

export const AnimatableView = styled(Animatable.View)`
  margin-top: 14%;
  margin-bottom: 8%;
  padding-start: 5%;
`;

export const BackIcon = styled(Icon)``;

export const WelcomeText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
`;

export const ContainerForm = styled(Animatable.View)`
  background-color: #fff;
  display: flex;
  flex: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-start: 5%;
  padding-end: 5%;
`;

export const TitleInput = styled.Text`
  font-size: 20px;
  margin-top: 28px;
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  height: 40px;
  margin-bottom: 12px;
  font-size: 16px;
`;

export const ErrorInput = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: red;
`;

export const Button = styled.TouchableOpacity`
  background-color: #ffca28;
  width: 100%;
  border-radius: 4px;
  padding-vertical: 8px;
  margin-top: 14px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const ErrorSubmit = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: red;
  text-align: center;
`;

export const SuccessSubmit = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: green;
  text-align: center;
`;
