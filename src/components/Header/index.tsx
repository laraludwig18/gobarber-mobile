import React from 'react';
import { StatusBar } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  const { top } = useSafeArea();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#28262e" />
      <Container paddingTop={top}>{children}</Container>
    </>
  );
};

export default Header;
