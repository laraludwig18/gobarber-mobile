import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import { mockedNavigate } from '../../../../testUtils/mocks/navigationMock';

import Provider from '.';

const provider = {
  id: 'id',
  name: 'John Doe',
};

describe('Provider Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('should be able to display provider data', () => {
    const { getByText } = render(<Provider provider={provider} />);

    const nameText = getByText('John Doe');

    expect(nameText).toBeTruthy();
  });

  it('should be able to display provider avatar', () => {
    const { getByTestId } = render(
      <Provider
        provider={{
          ...provider,
          avatarUrl: 'avatar-url',
        }}
      />,
    );

    const avatarElement = getByTestId('providerAvatar');

    expect(avatarElement).toHaveProp('source', { uri: 'avatar-url' });
  });

  it('should be able to navigate to CreateAppointment page', () => {
    const { getByTestId } = render(<Provider provider={provider} />);

    const containerElement = getByTestId('providerContainer');

    fireEvent.press(containerElement);

    expect(mockedNavigate).toHaveBeenCalledWith('CreateAppointment', {
      providerId: provider.id,
    });
  });
});
