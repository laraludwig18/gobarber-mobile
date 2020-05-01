import styled from 'styled-components/native';
import { Platform } from 'react-native';

interface BackToSignInProps {
  marginBottom: number;
}

export const BackToSignIn = styled.TouchableOpacity<BackToSignInProps>(
  (props) => `
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border: 1px solid #232129;
  padding: 16px 0 ${16 + props.marginBottom}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`,
);

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
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

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;
