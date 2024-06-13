import React, {useEffect, useState} from 'react';

import {
  AnimatableView,
  BackIcon,
  Button,
  ButtonText,
  Container,
  ContainerForm,
  ErrorInput,
  ErrorSubmit,
  Input,
  SuccessSubmit,
  TitleInput,
  WelcomeText,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../services/firebaseConfig';
import {useUserContext} from '../../contexts/user.context';

export default function Login() {
  const nv = useNavigation<any>();
  const {setUser} = useUserContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [firstValidationEmail, setFirstValidationEmail] =
    useState<boolean>(true);
  const [firstValidationPassword, setFirstValidationPassword] =
    useState<boolean>(true);

  useEffect(() => {
    _validateForm();
    if (firstValidationEmail && email.length > 0) {
      setFirstValidationEmail(!firstValidationEmail);
      return;
    }
    if (firstValidationPassword && password.length > 0) {
      setFirstValidationPassword(!firstValidationPassword);
      return;
    }
  }, [email, password]);

  const _validateForm = () => {
    let errors: any = {};
    if (!email) {
      errors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'E-mail é inválido.';
    }
    if (!password) {
      errors.password = 'Senha é obrigatória.';
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const _handleLogin = () => {
    if (isFormValid) {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          setSuccess('Login efetuado com sucesso.');
          setErrors({});
          setUser(user ?? null);
          nv.navigate('Home');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          let errors: any = {};
          if (errorCode === 'auth/invalid-credential') {
            errors.submit = 'Credencial inválida.';
          }
          setErrors(errors);
          setSuccess('');
        });
    }
  };

  return (
    <Container>
      <AnimatableView animation="fadeInLeft" delay={500}>
        <BackIcon
          onPress={() => nv.goBack()}
          name="arrow-left"
          size={30}
          color="#fff"
        />
        <WelcomeText>Bem vindo(a)</WelcomeText>
      </AnimatableView>
      <ContainerForm animation="fadeInUp">
        <TitleInput>E-mail:</TitleInput>
        <Input
          value={email}
          onChangeText={(_email: string) => setEmail(_email)}
          placeholder="Digite um e-mail"
        />
        {!firstValidationEmail && errors['email']!! && (
          <ErrorInput>{errors['email']}</ErrorInput>
        )}

        <TitleInput>Senha:</TitleInput>
        <Input
          value={password}
          onChangeText={_password => setPassword(_password)}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
        {!firstValidationPassword && errors['password']!! && (
          <ErrorInput>{errors['password']}</ErrorInput>
        )}

        <Button disabled={!isFormValid} onPress={_handleLogin}>
          <ButtonText>Acessar</ButtonText>
        </Button>
        {errors['submit']!! && <ErrorSubmit>{errors['submit']}</ErrorSubmit>}
        {success.length > 0 && <SuccessSubmit>{success}</SuccessSubmit>}
      </ContainerForm>
    </Container>
  );
}
