import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { Colors, Fonts } from '../../../constants';

export const Avatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  background-color: ${Colors.SHAPE};
  border-radius: 10px;
  padding: 20px;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const Name = styled.Text`
  color: ${Colors.LINEN};
  font-family: ${Fonts.MEDIUM};
  font-size: 18px;
  line-height: 24px;
`;

export const WorkingTime = styled.Text`
  color: ${Colors.GRAY};
  font-family: ${Fonts.REGULAR};
  font-size: 12px;
  line-height: 16px;
  margin-left: 8px;
`;

export const WorkingPeriod = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
