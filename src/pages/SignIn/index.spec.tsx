import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import { Alert } from 'react-native';
import SignIn from '.';

const mockedSignIn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../../context/auth', () => ({
  useAuth: () => ({
    signIn: mockedSignIn,
  }),
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
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

    fireEvent.changeText(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.changeText(passwordField, { target: { value: '212121' } });

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).not.toHaveBeenCalled();

      expect(getByText('Digita um email válido')).toBeTruthy();
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
});
