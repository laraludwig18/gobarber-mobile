import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Colors, Fonts } from '../../constants';

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${Colors.INPUTS};
  border-radius: 10px;
  border: 2px solid ${Colors.INPUTS};

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    `
    border-color: ${Colors.RED};
  `}

  ${(props) =>
    props.isFocused &&
    `
    border-color: ${Colors.ORANGE};
  `}
`;

export const Error = styled.Text`
  text-align: right;
  font-size: 12px;
  color: ${Colors.RED};
  font-family: ${Fonts.REGULAR};
  margin-bottom: 2px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${Colors.WHITE};
  font-size: 16px;
  font-family: ${Fonts.REGULAR};
`;

export const Wrapper = styled.View`
  margin-bottom: 8px;
`;
