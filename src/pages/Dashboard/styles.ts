import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IProvider } from './types';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProvidersList = styled(
  FlatList as new () => FlatList<IProvider>,
).attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 24px;
`;

export const ProvidersListTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin: 24px 0 32px;
  line-height: 33px;
`;
