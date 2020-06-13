import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ConfirmButton = styled(RectButton)`
  background-color: #ff9000;
  border-radius: 10px;
  padding: 17px 38px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 16px;
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Description = styled.Text`
  color: #999591;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Title = styled.Text`
  margin-top: 35px;
  color: #f4ede8;
  font-size: 30px;
  line-height: 40px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
`;
