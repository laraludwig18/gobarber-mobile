import React from 'react';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../../constants';
import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.BLACK_MEDIUM}
      />
      <Container paddingTop={top}>{children}</Container>
    </>
  );
};

export default Header;
