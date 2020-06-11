import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Avatar,
  Name,
  WorkingPeriod,
  Info,
  WorkingTime,
} from './styles';

export interface IProvider {
  id: string;
  name: string;
  avatarUrl: string;
}

interface IProviderProps {
  provider: IProvider;
}

const Provider: React.FC<IProviderProps> = ({ provider }) => {
  const { navigate } = useNavigation();

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', {
        providerId,
      });
    },
    [navigate],
  );

  return (
    <Container onPress={() => navigateToCreateAppointment(provider.id)}>
      <Avatar source={{ uri: provider.avatarUrl }} />

      <Info>
        <Name>{provider.name}</Name>

        <WorkingPeriod>
          <Icon name="calendar" size={14} color="#ff9000" />
          <WorkingTime>Segunda à sexta</WorkingTime>
        </WorkingPeriod>

        <WorkingPeriod>
          <Icon name="calendar" size={14} color="#ff9000" />
          <WorkingTime>8h às 18h</WorkingTime>
        </WorkingPeriod>
      </Info>
    </Container>
  );
};

export default Provider;
