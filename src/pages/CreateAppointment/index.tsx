import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Platform, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { useApiClient } from '../../services/apiClient';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';

import {
  BackButton,
  Container,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Content,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
  ProfileButton,
} from './styles';

export interface IProvider {
  id: string;
  name: string;
  avatarUrl: string;
}

interface IRouteParams {
  providerId: string;
}

interface IProviderDayAvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack, reset, navigate } = useNavigation();
  const route = useRoute();
  const api = useApiClient();

  const routeParams = route.params as IRouteParams;

  const [providerDayAvailability, setProviderDayAvailability] = useState<
    IProviderDayAvailabilityItem[]
  >([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    async function getProviders(): Promise<void> {
      const { data } = await api.get('providers');

      setProviders(data);
    }

    getProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getProviderDayAvailability(): Promise<void> {
      const { data } = await api.get(
        `providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );

      setProviderDayAvailability(data);
    }

    getProviderDayAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((oldState) => !oldState);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      reset({
        routes: [
          {
            name: 'Dashboard',
          },
          {
            name: 'AppointmentCreated',
            params: {
              date: date.getTime(),
            },
          },
        ],
        index: 1,
      });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente.',
      );
    }
  }, [api, reset, selectedDate, selectedHour, selectedProvider]);

  const providerMorningAvailability = useMemo(() => {
    return providerDayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [providerDayAvailability]);

  const providerAfternoonAvailability = useMemo(() => {
    return providerDayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [providerDayAvailability]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatarUrl }} />
        </ProfileButton>
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => {
              const isProviderSelected = provider.id === selectedProvider;
              return (
                <ProviderContainer
                  onPress={() => handleSelectProvider(provider.id)}
                  selected={isProviderSelected}
                >
                  <ProviderAvatar source={{ uri: provider.avatarUrl }} />
                  <ProviderName selected={isProviderSelected}>
                    {provider.name}
                  </ProviderName>
                </ProviderContainer>
              );
            }}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              minimumDate={new Date()}
              mode="date"
              display="calendar"
              textColor="#f4ede8"
              value={selectedDate}
              onChange={handleDateChanged}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {providerMorningAvailability.map(
                ({ hourFormatted, available, hour }) => {
                  const isHourSelected = hour === selectedHour;

                  return (
                    <Hour
                      enabled={available}
                      selected={isHourSelected}
                      onPress={() => handleSelectHour(hour)}
                      available={available}
                      key={hourFormatted}
                    >
                      <HourText selected={isHourSelected}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  );
                },
              )}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {providerAfternoonAvailability.map(
                ({ hourFormatted, available, hour }) => {
                  const isHourSelected = hour === selectedHour;

                  return (
                    <Hour
                      enabled={available}
                      selected={isHourSelected}
                      onPress={() => handleSelectHour(hour)}
                      available={available}
                      key={hourFormatted}
                    >
                      <HourText selected={isHourSelected}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  );
                },
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
