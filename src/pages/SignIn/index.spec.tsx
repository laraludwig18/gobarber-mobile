import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import { mockedSignIn } from '../../../testUtils/mocks/authMock';
import { mockedNavigate } from '../../../testUtils/mocks/navigationMock';

import SignIn from '.';

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
    mockedNavigate.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholder, getByText } = render(<SignIn />);

    const emailField = getByPlaceholder('Digite seu email');
    const passwordField = getByPlaceholder('Digite sua senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '212121');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith({
        email: 'johndoe@example.com',
        password: '212121',
      });
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholder, getByText } = render(<SignIn />);

    const emailField = getByPlaceholder('Digite seu email');
    const passwordField = getByPlaceholder('Digite sua senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, 'not-valid-email');
    fireEvent.changeText(passwordField, '212121');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).not.toHaveBeenCalled();

      expect(getByText('Digite um email válido')).toBeTruthy();
    });
  });

  it('should display an error if login fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    mockedSignIn.mockImplementationOnce(() => {
      throw new Error();
    });

    const { getByPlaceholder, getByText } = render(<SignIn />);

    const emailField = getByPlaceholder('Digite seu email');
    const passwordField = getByPlaceholder('Digite sua senha');
    const buttonElement = getByText('Entrar');

    fireEvent.changeText(emailField, 'johndoe@example.com');
    fireEvent.changeText(passwordField, '212121');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',
      );
    });
  });

  it('should be able to navigate to sign up page', async () => {
    const { getByText } = render(<SignIn />);

    const buttonElement = getByText('Criar uma conta');

    fireEvent.press(buttonElement);

    expect(mockedNavigate).toHaveBeenCalledWith('SignUp');
  });
});
