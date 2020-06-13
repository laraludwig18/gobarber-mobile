import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const BackButton = styled.TouchableOpacity`
  margin-top: 60px;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
})`
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;
