import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Avatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  background-color: #3e3b47;
  border-radius: 10px;
  padding: 20px;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const Name = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  line-height: 24px;
`;

export const WorkingTime = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  font-size: 12px;
  line-height: 16px;
  margin-left: 8px;
`;

export const WorkingPeriod = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
