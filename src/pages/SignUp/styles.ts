import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { Colors, Fonts } from '../../constants';

interface IBackToSignInProps {
  marginBottom: number;
}

export const BackToSignIn = styled.TouchableOpacity<IBackToSignInProps>(
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

export const BackToSignInText = styled.Text`
  color: ${Colors.WHITE};
  font-size: 18px;
  font-family: ${Fonts.REGULAR};
  margin-left: 16px;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
})`
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${Colors.LINEN};
  font-family: ${Fonts.MEDIUM};
  margin: 64px 0 24px;
`;
