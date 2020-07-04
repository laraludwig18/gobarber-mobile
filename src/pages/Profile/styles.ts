import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { Colors, Fonts } from '../../constants';

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

export const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.LINEN};
  font-family: ${Fonts.MEDIUM};
  margin: 24px 0;
`;
