import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { capitalizeFirstWordLetter } from '../../utils';

import {
  ConfirmButton,
  ConfirmButtonText,
  Container,
  Description,
  Title,
} from './styles';

interface IRouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as IRouteParams;

  const formattedDate = useMemo(() => {
    return capitalizeFirstWordLetter(
      format(
        routeParams.date,
        "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
        {
          locale: ptBR,
        },
      ),
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <ConfirmButton onPress={goBack}>
        <ConfirmButtonText>Ok</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
};

export default AppointmentCreated;
