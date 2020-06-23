import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import '../../../testUtils/mocks/authMock';
import mockedApi from '../../../testUtils/mocks/apiMock';
import {
  mockedNavigate,
  mockedReset,
} from '../../../testUtils/mocks/navigationMock';

import CreateAppointment from '.';

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

const providerAvailability = [
  {
    hour: 8,
    available: true,
  },
  {
    hour: 9,
    available: true,
  },
  {
    hour: 10,
    available: false,
  },
  {
    hour: 13,
    available: true,
  },
  {
    hour: 14,
    available: true,
  },
  {
    hour: 15,
    available: true,
  },
];

describe('CreateAppointment Page', () => {
  beforeEach(() => {
    mockedApi.onGet('providers').reply(200, providersList);
    mockedApi
      .onGet('providers/id-1/day-availability')
      .reply(200, providerAvailability);
    mockedNavigate.mockClear();
  });

  it('should be able to display providers', async () => {
    const { getByText } = render(<CreateAppointment />);

    await waitFor(() => {
      expect(getByText('provider 1')).toBeTruthy();
      expect(getByText('provider 2')).toBeTruthy();
    });
  });

  it('should highlight the selected provider', async () => {
    const { getByText, getByTestId } = render(<CreateAppointment />);

    await waitFor(() => {
      expect(getByText('provider 1')).toHaveStyle({
        color: '#232129',
      });
      expect(getByTestId('id-1')).toHaveStyle({
        backgroundColor: '#FF9000',
      });
    });
  });

  it('should be able to display user avatar in the header', async () => {
    const { getByTestId } = render(<CreateAppointment />);

    const avatarElement = getByTestId('userAvatar');

    await waitFor(() => {
      expect(avatarElement).toHaveProp('source', { uri: 'avatar-url' });
    });
  });

  it('should be able to navigate to profile page', async () => {
    const { getByTestId } = render(<CreateAppointment />);

    const profileButton = getByTestId('profileButton');

    fireEvent.press(profileButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Profile');
    });
  });

  it('should be able to display provider availability', async () => {
    const { getByText } = render(<CreateAppointment />);

    await waitFor(() => {
      expect(getByText('08:00')).toBeTruthy();
      expect(getByText('09:00')).toBeTruthy();
      expect(getByText('10:00')).toBeTruthy();
      expect(getByText('13:00')).toBeTruthy();
      expect(getByText('14:00')).toBeTruthy();
      expect(getByText('15:00')).toBeTruthy();
    });
  });

  it('should decrease opacity of unavailable hour container and disable selection', async () => {
    const { getByTestId } = render(<CreateAppointment />);

    await waitFor(() => {
      const selectHourButton = getByTestId('10:00');

      expect(selectHourButton).toHaveStyle({ opacity: 0.3 });
      expect(selectHourButton).toHaveProp('enabled', false);
    });
  });

  it('should highlight the selected hour', async () => {
    const { getByTestId, getByText } = render(<CreateAppointment />);

    await waitFor(() => {
      const selectHourButton = getByTestId('09:00');
      const selectHourButtonText = getByText('09:00');

      fireEvent.press(selectHourButton);

      expect(selectHourButton).toHaveStyle({ backgroundColor: '#FF9000' });
      expect(selectHourButtonText).toHaveStyle({ color: '#232129' });
    });
  });

  it('should be able to create appointment', async () => {
    mockedApi.onPost('appointments').reply(200);

    const { getByText, getByTestId } = render(<CreateAppointment />);

    await waitFor(() => {
      const selectHourButton = getByTestId('09:00');
      const createAppointmentButton = getByText('Agendar');

      fireEvent.press(selectHourButton);
      fireEvent.press(createAppointmentButton);

      expect(mockedReset).toHaveBeenCalledWith({
        routes: [
          {
            name: 'Dashboard',
          },
          {
            name: 'AppointmentCreated',
            params: {
              date: expect.any(Number),
            },
          },
        ],
        index: 1,
      });
    });
  });

  it('should display an error if appointment creation fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    mockedApi.onPost('appointments').reply(500);

    const { getByText, getByTestId } = render(<CreateAppointment />);

    await waitFor(() => {
      const selectHourButton = getByTestId('09:00');
      const createAppointmentButton = getByText('Agendar');

      fireEvent.press(selectHourButton);
      fireEvent.press(createAppointmentButton);

      expect(alertSpy).toHaveBeenCalledWith(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente.',
      );
    });
  });

  it('should be able to change selected provider', async () => {
    const { getByText, getByTestId } = render(<CreateAppointment />);

    await waitFor(() => {
      const oldSelectedProviderButton = getByTestId('id-1');
      const selectedProviderButton = getByTestId('id-2');

      fireEvent.press(selectedProviderButton);

      expect(oldSelectedProviderButton).not.toHaveStyle({
        backgroundColor: '#FF9000',
      });
      expect(getByText('provider 1')).not.toHaveStyle({
        color: '#232129',
      });
      expect(getByText('provider 2')).toHaveStyle({
        color: '#232129',
      });
      expect(selectedProviderButton).toHaveStyle({
        backgroundColor: '#FF9000',
      });
    });
  });

  it('should be able to open date picker', async () => {
    const { getByText, getByTestId } = render(<CreateAppointment />);

    const openDatePickerButton = getByText('Selecionar outra data');

    fireEvent.press(openDatePickerButton);

    await waitFor(() => {
      expect(getByTestId('datePicker')).toBeTruthy();
    });
  });
});
