import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import mockedApi from '../../../../testUtils/mocks/apiMock';
import { mockedUpdateUser } from '../../../../testUtils/mocks/authMock';
import { mockedGoBack } from '../../../../testUtils/mocks/navigationMock';

import AvatarInput from '.';

jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn().mockImplementation((options, callback) =>
    callback({
      didCancel: false,
      error: '',
      uri: 'file://pixel.jpg',
      fileName: 'filename',
      type: 'image/jpeg',
    }),
  ),
}));

const alertSpy = jest.spyOn(Alert, 'alert');

describe('AvatarInput Component', () => {
  beforeEach(() => {
    alertSpy.mockClear();
    mockedUpdateUser.mockClear();
    mockedGoBack.mockClear();
  });

  it('should be able to display user avatar', () => {
    const { getByTestId } = render(<AvatarInput />);

    const avatarElement = getByTestId('userAvatar');

    expect(avatarElement).toHaveProp('source', { uri: 'avatar-url' });
  });

  it('should be able to change user avatar', async () => {
    const updatedUser = {
      id: 'id',
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      avatarUrl: 'new-avatar-url',
    };

    mockedApi.onPatch('users/avatar').reply(200, updatedUser);

    const { getByTestId } = render(<AvatarInput />);

    const changeAvatarButton = getByTestId('changeAvatarButton');

    fireEvent.press(changeAvatarButton);

    await waitFor(() => {
      expect(mockedUpdateUser).toHaveBeenCalledWith(updatedUser);
    });
  });

  it('should display an error if avatar update fails', async () => {
    mockedApi.onPatch('users/avatar').reply(500);

    const { getByTestId } = render(<AvatarInput />);

    const changeAvatarButton = getByTestId('changeAvatarButton');

    fireEvent.press(changeAvatarButton);

    await waitFor(() => {
      expect(mockedUpdateUser).not.toHaveBeenCalled();

      expect(alertSpy).toHaveBeenCalledWith(
        'Erro na atualização do avatar.',
        'Ocorreu um erro ao atualizar seu avatar, tente novamente.',
      );
    });
  });
});
