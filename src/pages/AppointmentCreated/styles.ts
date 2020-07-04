import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { Colors, Fonts } from '../../constants';

export const ConfirmButton = styled(RectButton)`
  background-color: ${Colors.ORANGE};
  border-radius: 10px;
  padding: 17px 38px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 16px;
  color: ${Colors.BACKGROUND};
  font-family: ${Fonts.MEDIUM};
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Description = styled.Text`
  color: ${Colors.GRAY};
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
  font-family: ${Fonts.REGULAR};
`;

export const Title = styled.Text`
  margin-top: 35px;
  color: ${Colors.LINEN};
  font-size: 30px;
  line-height: 40px;
  font-family: ${Fonts.MEDIUM};
  text-align: center;
`;
