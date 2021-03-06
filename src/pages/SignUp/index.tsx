import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { object, string, ValidationError } from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useApiClient } from '../../services/apiClient';
import logoImg from '../../assets/logo/logo.png';
import { getValidationErrors } from '../../utils';

import { Colors } from '../../constants';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();
  const api = useApiClient();

  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = object().shape({
          name: string().required('Nome obrigatório'),
          email: string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação!',
        );

        goBack();
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente.',
        );
      }
    },
    [api, goBack],
  );

  const submitForm = useCallback(() => formRef.current?.submitForm(), []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container keyboardShouldPersistTaps="handled">
          <Image source={logoImg} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Digite seu nome"
              returnKeyType="next"
              onSubmitEditing={() => emailRef?.current?.focus()}
            />
            <Input
              ref={emailRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="Digite seu email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef?.current?.focus()}
            />
            <Input
              ref={passwordRef}
              name="password"
              icon="lock"
              placeholder="Digite sua senha"
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={submitForm}
              textContentType="newPassword"
            />

            <Button onPress={submitForm}>Cadastrar</Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>

      <BackToSignIn
        marginBottom={insets.bottom}
        onPress={goBack}
        hitSlop={{ bottom: 20, right: 20, left: 20 }}
      >
        <Icon name="arrow-left" size={20} color={Colors.WHITE} />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
