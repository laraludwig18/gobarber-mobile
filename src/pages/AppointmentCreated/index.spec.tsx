import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import {
  mockedGoBack,
  mockedParams,
} from '../../../testUtils/mocks/navigationMock';

import AppointmentCreated from '.';

jest.mock('date-fns', () => ({
  format: jest.fn().mockReturnValue('terça, dia 14 de março de 2020 às 12:00h'),
}));

describe('AppointmentCreated Page', () => {
  beforeEach(() => {
    mockedGoBack.mockClear();
  });

  it('should be able to display appointment information', () => {
    mockedParams.mockReturnValue({
      date: 12121212,
    });

    const { getByText } = render(<AppointmentCreated />);

    const dateElement = getByText('Terça, dia 14 de março de 2020 às 12:00h');

    expect(dateElement).toBeTruthy();
  });

  it('should be able to go back', () => {
    const { getByText } = render(<AppointmentCreated />);

    const confirmButton = getByText('Ok');

    fireEvent.press(confirmButton);

    expect(mockedGoBack).toHaveBeenCalled();
  });
});
