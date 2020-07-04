import styled from 'styled-components/native';

import { Colors } from '../../../constants';

export const Avatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
`;

export const Container = styled.View`
  align-self: center;
`;

export const ChangeAvatarButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${Colors.ORANGE};
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
