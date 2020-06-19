import React, { useCallback, useRef } from 'react';
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
import { useSafeArea } from 'react-native-safe-area-context';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { string, object, ValidationError } from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../context/auth';
import { getValidationErrors } from '../../utils';
import logoImg from '../../assets/logo/logo.png';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();
  const insets = useSafeArea();

  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = object().shape({
          email: string()
            .required('Email obrigatório')
            .email('Digita um email válido'),
          password: string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [signIn],
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
            <Title>Faça seu logon</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
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

            <Button onPress={submitForm}>Entrar</Button>
          </Form>

          <ForgotPassword
            onPress={() => null}
            hitSlop={{ bottom: 20, right: 20, left: 20 }}
          >
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </KeyboardAvoidingView>

      <CreateAccount
        marginBottom={insets.bottom}
        onPress={() => navigate('SignUp')}
        hitSlop={{ bottom: 20, right: 20, left: 20 }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SignIn;
