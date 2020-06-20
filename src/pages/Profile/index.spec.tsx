import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import mockedApi from '../../../testUtils/mocks/apiMock';
import { mockedUpdateUser } from '../../../testUtils/mocks/authMock';
import { mockedGoBack } from '../../../testUtils/mocks/navigationMock';

import Profile from '.';

jest.mock('./AvatarInput', () => 'AvatarInput');

const alertSpy = jest.spyOn(Alert, 'alert');

describe('Profile Page', () => {
  beforeEach(() => {
    alertSpy.mockClear();
    mockedUpdateUser.mockClear();
    mockedGoBack.mockClear();
  });

  it('should display user data in the text input', async () => {
    const { getByPlaceholder } = render(<Profile />);

    const nameField = getByPlaceholder('Digite seu nome');
    const emailField = getByPlaceholder('Digite seu email');

    await waitFor(() => {
      expect(nameField).toHaveProp('defaultValue', 'Jonh Doe');
      expect(emailField).toHaveProp('defaultValue', 'johndoe@gmail.com');
    });
  });

  it('should be able to update only user name', async () => {
    const updatedUser = {
      id: 'id',
      email: 'johndoe@gmail.com',
      name: 'Jonh Doe 2',
    };

    mockedApi.onPut('profile').reply(200, updatedUser);

    const { getByPlaceholder, getByText } = render(<Profile />);

    const nameField = getByPlaceholder('Digite seu nome');
    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.changeText(nameField, 'John Doe 2');
    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedUpdateUser).toHaveBeenCalledWith(updatedUser);

      expect(alertSpy).toHaveBeenCalledWith('Perfil atualizado com sucesso!');

      expect(mockedGoBack).toHaveBeenCalled();
    });
  });

  it('should be able to update password', async () => {
    const updatedUser = {
      id: 'id',
      email: 'johndoe@gmail.com',
      name: 'Jonh Doe',
    };

    mockedApi.onPut('profile').reply(200, updatedUser);

    const { getByPlaceholder, getByText } = render(<Profile />);

    const oldPasswordField = getByPlaceholder('Digite sua senha atual');
    const passwordField = getByPlaceholder('Digite sua nova senha');
    const confirmPasswordField = getByPlaceholder(
      'Digite a confirmação da nova senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.changeText(oldPasswordField, 'old-password');
    fireEvent.changeText(passwordField, '212121');
    fireEvent.changeText(confirmPasswordField, '212121');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedUpdateUser).toHaveBeenCalledWith(updatedUser);

      expect(alertSpy).toHaveBeenCalledWith('Perfil atualizado com sucesso!');

      expect(mockedGoBack).toHaveBeenCalled();
    });
  });

  it('should not be able to update password if password and confirmation does not match', async () => {
    const { getByPlaceholder, getByText } = render(<Profile />);

    const oldPasswordField = getByPlaceholder('Digite sua senha atual');
    const passwordField = getByPlaceholder('Digite sua nova senha');
    const confirmPasswordField = getByPlaceholder(
      'Digite a confirmação da nova senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.changeText(oldPasswordField, 'old-password');
    fireEvent.changeText(passwordField, '212121');
    fireEvent.changeText(confirmPasswordField, '212122');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedUpdateUser).not.toHaveBeenCalled();
      expect(mockedGoBack).not.toHaveBeenCalled();
      expect(alertSpy).not.toHaveBeenCalled();

      expect(getByText('Senhas não coincidem')).toBeTruthy();
    });
  });

  it('should not be able to update user profile with invalid data', async () => {
    const { getByPlaceholder, getByText } = render(<Profile />);

    const emailField = getByPlaceholder('Digite seu email');
    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.changeText(emailField, 'not-valid-email');
    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedUpdateUser).not.toHaveBeenCalled();
      expect(mockedGoBack).not.toHaveBeenCalled();
      expect(alertSpy).not.toHaveBeenCalled();

      expect(getByText('Digite um email válido')).toBeTruthy();
    });
  });

  it('should display an error if user update fails', async () => {
    mockedApi.onPut('profile').reply(500);

    const { getByPlaceholder, getByText } = render(<Profile />);

    const nameField = getByPlaceholder('Digite seu nome');
    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.changeText(nameField, 'John Doe 2');
    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedUpdateUser).not.toHaveBeenCalled();
      expect(mockedGoBack).not.toHaveBeenCalled();

      expect(alertSpy).toHaveBeenCalledWith(
        'Erro na atualização do perfil',
        'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
      );
    });
  });

  it('should be able to go back', async () => {
    const { getByTestId } = render(<Profile />);

    const backButtonElement = getByTestId('backButton');
    fireEvent.press(backButtonElement);

    expect(mockedGoBack).toHaveBeenCalled();
  });
});
