import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { Colors, Fonts } from '../../constants';

export const ButtonText = styled.Text`
  font-family: ${Fonts.MEDIUM};
  color: ${Colors.BACKGROUND};
  font-size: 18px;
`;

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: ${Colors.ORANGE};
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;
