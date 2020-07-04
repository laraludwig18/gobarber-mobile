import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { Colors, Fonts } from '../../constants';

interface ICreateAccountProps {
  marginBottom: number;
}

export const CreateAccount = styled.TouchableOpacity<ICreateAccountProps>(
  (props) => `
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${Colors.BACKGROUND};
  border: 1px solid ${Colors.INPUTS};
  padding: 16px 0 ${16 + props.marginBottom}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`,
);

export const CreateAccountText = styled.Text`
  color: ${Colors.ORANGE};
  font-size: 18px;
  font-family: ${Fonts.REGULAR};
  margin-left: 16px;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${Colors.LINEN};
  font-size: 16px;
  font-family: ${Fonts.REGULAR};
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${Colors.LINEN};
  font-family: ${Fonts.MEDIUM};
  margin: 64px 0 24px;
`;
