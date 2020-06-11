import React from 'react';
import { useSafeArea } from 'react-native-safe-area-context';

import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  const { top } = useSafeArea();

  return <Container paddingTop={top}>{children}</Container>;
};

export default Header;
