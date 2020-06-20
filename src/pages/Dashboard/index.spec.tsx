import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import '../../../testUtils/mocks/authMock';
import mockedApi from '../../../testUtils/mocks/apiMock';
import { mockedNavigate } from '../../../testUtils/mocks/navigationMock';

import Dashboard from '.';

const providersList = [
  {
    id: 'id-1',
    name: 'provider 1',
    email: 'provider1@example.com',
  },
  {
    id: 'id-2',
    name: 'provider 2',
    email: 'provider2@example.com',
  },
];

describe('Dashboard Page', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('should be able to display user name and avatar in the header', () => {
    const { getByText, getByTestId } = render(<Dashboard />);

    const nameText = getByText('John Doe');
    const avatarElement = getByTestId('userAvatar');

    expect(nameText).toBeTruthy();
    expect(avatarElement).toHaveProp('source', { uri: 'avatar-url' });
  });

  it('should be able to navigate to profile page', () => {
    const { getByTestId } = render(<Dashboard />);

    const profileButton = getByTestId('profileButton');

    fireEvent.press(profileButton);

    expect(mockedNavigate).toHaveBeenCalledWith('Profile');
  });

  it('should be able to display providers data', async () => {
    mockedApi.onGet('providers').reply(200, providersList);

    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText('provider 1')).toBeTruthy();
      expect(getByText('provider 2')).toBeTruthy();
    });
  });
});
