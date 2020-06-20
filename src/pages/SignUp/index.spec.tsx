import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import mockedApi from '../../../testUtils/mocks/apiMock';
import { mockedGoBack } from '../../../testUtils/mocks/navigationMock';

import SignUp from '.';

const alertSpy = jest.spyOn(Alert, 'alert');

describe('SignUp Page', () => {
  beforeEach(() => {
    alertSpy.mockClear();
    mockedGoBack.mockClear();
  });

  it('should be able to sign up', async () => {
    mockedApi.onPost('users').reply(200);

    const { getByPlaceholder, getByText } = render(<SignUp />);

    const nameField = getByPlaceholder('Digite seu nome');
    const emailField = getByPlaceholder('Digite seu email');
    const passwordField = getByPlaceholder('Digite sua senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.changeText(nameField, 'John Doe');
    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '212121');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login na aplicação!',
      );

      expect(mockedGoBack).toHaveBeenCalled();
    });
  });

  it('should not be able to sign up with invalid data', async () => {
    const { getByPlaceholder, getByText } = render(<SignUp />);

    const nameField = getByPlaceholder('Digite seu nome');
    const emailField = getByPlaceholder('Digite seu email');
    const passwordField = getByPlaceholder('Digite sua senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.changeText(nameField, 'John Doe');
    fireEvent.changeText(emailField, 'not-valid-email');
    fireEvent.changeText(passwordField, '212121');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(alertSpy).not.toHaveBeenCalled();
      expect(mockedGoBack).not.toHaveBeenCalled();

      expect(getByText('Digite um email válido')).toBeTruthy();
    });
  });

  it('should display an error if user creation fails', async () => {
    mockedApi.onPost('users').reply(500);

    const { getByPlaceholder, getByText } = render(<SignUp />);

    const nameField = getByPlaceholder('Digite seu nome');
    const emailField = getByPlaceholder('Digite seu email');
    const passwordField = getByPlaceholder('Digite sua senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.changeText(nameField, 'John Doe');
    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '212121');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedGoBack).not.toHaveBeenCalled();

      expect(alertSpy).toHaveBeenCalledWith(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente.',
      );
    });
  });

  it('should be able to navigate to sign in page', async () => {
    const { getByText } = render(<SignUp />);

    const buttonElement = getByText('Voltar para logon');

    fireEvent.press(buttonElement);

    expect(mockedGoBack).toHaveBeenCalled();
  });
});
