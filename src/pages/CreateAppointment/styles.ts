import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { IProvider } from '.';

interface IProviderContainerProps {
  selected: boolean;
}

interface IProviderNameProps {
  selected: boolean;
}

interface IHourProps {
  available: boolean;
  selected: boolean;
}

interface IHourTextProps {
  selected: boolean;
}

export const BackButton = styled.TouchableOpacity``;

export const Calendar = styled.View``;

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;

export const Hour = styled(RectButton)<IHourProps>`
  padding: 12px;
  background-color: ${(props) => (props.selected ? '#FF9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<IHourTextProps>`
  font-size: 16px;
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  align-items: center;
  margin: 0 24px;
  justify-content: center;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProviderAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16px;
`;

export const ProviderContainer = styled(RectButton)<IProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 8px 12px;
  background-color: ${(props) => (props.selected ? '#FF9000' : '#3e3b47')};
  margin-right: 16px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<IProvider>,
).attrs({
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 24,
    paddingRight: 8,
  },
})`
  padding: 32px 0;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProviderName = styled.Text<IProviderNameProps>`
  margin-left: 8px;
  font-size: 16px;
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionContent = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})``;

export const SectionTitle = styled.Text`
  color: #999591;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 12px;
  margin-left: 24px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f4ede8;
  margin: 0 24px 24px;
`;
