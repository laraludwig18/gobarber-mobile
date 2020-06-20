import React, { useRef, useCallback } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { object, string, ValidationError, ref } from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';
import AvatarInput from './AvatarInput';

import { useAuth } from '../../context/auth';
import { useApiClient } from '../../services/apiClient';
import { getValidationErrors } from '../../utils';

import { BackButton, Container, Title } from './styles';

interface IProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { goBack } = useNavigation();
  const api = useApiClient();

  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const passwordConfirmationRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: IProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = object().shape({
          name: string().required('Nome obrigatório'),
          email: string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          oldPassword: string(),
          password: string().when('oldPassword', {
            is: (val) => !!val.length,
            then: string().min(6, 'No mínimo 6 dígitos'),
            otherwise: string(),
          }),
          passwordConfirmation: string()
            .when('oldPassword', {
              is: (val) => !!val.length,
              then: string().min(6, 'No mínimo 6 dígitos'),
              otherwise: string(),
            })
            .oneOf([ref('password'), null], 'Senhas não coincidem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = data?.password
          ? data
          : {
              name: data.name,
              email: data.email,
            };

        const response = await api.put('profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

        goBack();
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [api, goBack, updateUser],
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
          <BackButton onPress={goBack} testID="backButton">
            <Icon name="chevron-left" size={26} color="#999591" />
          </BackButton>
          <AvatarInput />

          <View>
            <Title>Meu perfil</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit} initialData={user}>
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
              onSubmitEditing={() => oldPasswordRef?.current?.focus()}
            />
            <Input
              ref={oldPasswordRef}
              containerStyle={{ marginTop: 16 }}
              name="oldPassword"
              icon="lock"
              placeholder="Digite sua senha atual"
              secureTextEntry
              returnKeyType="next"
              textContentType="newPassword"
              onSubmitEditing={() => passwordRef?.current?.focus()}
            />
            <Input
              ref={passwordRef}
              name="password"
              icon="lock"
              placeholder="Digite sua nova senha"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => passwordConfirmationRef?.current?.focus()}
              textContentType="newPassword"
            />
            <Input
              ref={passwordConfirmationRef}
              name="passwordConfirmation"
              icon="lock"
              placeholder="Digite a confirmação da nova senha"
              secureTextEntry
              returnKeyType="done"
              textContentType="newPassword"
              onSubmitEditing={submitForm}
            />
            <Button onPress={submitForm}>Confirmar mudanças</Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
